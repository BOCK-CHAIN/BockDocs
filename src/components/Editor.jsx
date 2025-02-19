import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import Toolbar from './Toolbar'
import html2pdf from 'html2pdf.js'
import { saveAs } from 'file-saver'
import { useState, useRef, useEffect } from 'react'

export default function Editor({ 
  documentId, 
  initialContent,
  onSave,
  saving,
  lastSaved
}) {
  const [pages, setPages] = useState([1]);
  const editorRef = useRef(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true,
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      Underline,
      FontFamily.configure({
        types: ['textStyle'],
        defaultFontFamily: 'Times New Roman',
        fonts: [
          {
            name: 'Times New Roman',
            value: '"Times New Roman", Times, serif'
          },
          {
            name: 'Arial',
            value: 'Arial, Helvetica, sans-serif'
          },
          {
            name: 'Courier New',
            value: '"Courier New", Courier, monospace'
          },
          {
            name: 'Georgia',
            value: 'Georgia, serif'
          },
          {
            name: 'Verdana',
            value: 'Verdana, Geneva, sans-serif'
          }
        ],
      }),
      TextStyle.configure({
        types: ['textStyle'],
        defaultFontSize: '12pt'
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2 bg-gray-100',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none prose-headings:margin-top-0 prose-p:margin-top-0',
        style: 'font-family: "Times New Roman", Times, serif;'
      },
    },
    onUpdate: ({ editor }) => {
      if (onSave) {
        onSave(editor.getHTML());
      }
    },
  })

  useEffect(() => {
    if (editor && editorRef.current) {
      const contentHeight = editorRef.current.offsetHeight;
      const pageHeight = 1056; // A4 height in pixels
      const numberOfPages = Math.ceil(contentHeight / pageHeight);
      setPages(Array.from({ length: numberOfPages }, (_, i) => i + 1));
    }
  }, [editor?.getHTML()]);

  if (!editor) return null

  const handleExport = async (format) => {
    const content = editor.getHTML();
    const title = 'document'; // You can pass the document title as a prop if needed

    switch (format) {
      case 'pdf':
        const element = document.createElement('div');
        element.innerHTML = content;
        const opt = {
          margin: 1,
          filename: `${title}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
        break;

      case 'docx':
        // For simplicity, we'll export as HTML that can be opened in Word
        const htmlContent = `
          <html>
            <body>
              ${content}
            </body>
          </html>
        `;
        const blob = new Blob([htmlContent], { type: 'application/msword' });
        saveAs(blob, `${title}.doc`);
        break;

      case 'text':
        const textContent = editor.getText();
        const textBlob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        saveAs(textBlob, `${title}.txt`);
        break;

      case 'html':
        const htmlBlob = new Blob([content], { type: 'text/html;charset=utf-8' });
        saveAs(htmlBlob, `${title}.html`);
        break;

      case 'markdown':
        // You would need a HTML to Markdown converter here
        // For now, we'll just save the text
        const markdownBlob = new Blob([editor.getText()], { type: 'text/markdown' });
        saveAs(markdownBlob, `${title}.md`);
        break;

      default:
        console.error('Unsupported format');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <Toolbar editor={editor} onExport={handleExport} />
      </div>
      <div className="flex-grow overflow-auto px-4 py-8">
        <div className="max-w-[850px] mx-auto">
          {pages.map((pageNum) => (
            <div 
              key={pageNum}
              className="bg-white min-h-[1056px] shadow-lg rounded-sm mb-8 relative"
            >
              <div className="absolute top-0 right-0 mt-2 mr-2 text-sm text-gray-400">
                Page {pageNum}
              </div>
              {pageNum === 1 ? (
                <div className="px-12 py-12" ref={editorRef}>
                  <EditorContent 
                    editor={editor} 
                    className="min-h-[1000px] page-break-inside-auto"
                  />
                </div>
              ) : (
                <div className="px-12 py-12 min-h-[1000px]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 