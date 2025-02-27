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
import { useState, useRef, useEffect, useCallback } from 'react'
import useThemeStore from '../store/themeStore'
import Document from '@tiptap/extension-document'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'

export default function Editor({ 
  documentId, 
  initialContent,
  onSave,
  saving,
  lastSaved
}) {
  const { isDarkMode } = useThemeStore();
  const [pages, setPages] = useState([1]);
  const editorRef = useRef(null);
  const pageRefs = useRef([]);
  
  // A4 page dimensions (96 DPI)
  const PAGE_HEIGHT = 1056; // 11 inches
  const PAGE_WIDTH = 816;  // 8.5 inches
  const PAGE_PADDING = 96; // 1 inch margins
  const CONTENT_HEIGHT = PAGE_HEIGHT - (PAGE_PADDING * 2);

  const updatePages = () => {
    if (!editorRef.current) return;

    const content = editorRef.current;
    const contentHeight = content.scrollHeight;
    const numberOfPages = Math.max(1, Math.ceil(contentHeight / CONTENT_HEIGHT));
    
    if (numberOfPages !== pages.length) {
      setPages(Array.from({ length: numberOfPages }, (_, i) => i + 1));
    }
  };

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
        HTMLAttributes: {
          class: 'text-style',
        },
        defaultFontSize: '12pt'
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
        lastColumnResizable: true,
        cellMinWidth: 100,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2 relative',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2 bg-gray-100 font-bold relative',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      Document.extend({
        addOptions() {
          return {
            ...this.parent?.(),
            pageBreak: true,
          }
        },
        addGlobalAttributes() {
          return [
            {
              types: ['textStyle'],
              attributes: {
                fontSize: {
                  default: '12pt',
                  parseHTML: element => element.style.fontSize,
                  renderHTML: attributes => {
                    if (!attributes.fontSize) return {}
                    return {
                      style: `font-size: ${attributes.fontSize}`
                    }
                  }
                }
              }
            }
          ]
        }
      }),
      Superscript,
      Subscript,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
        style: 'min-height: 100%',
      },
    },
    onUpdate: ({ editor }) => {
      if (onSave) {
        onSave(editor.getHTML());
      }
      updatePages();
    },
  });

  useEffect(() => {
    if (editor && editorRef.current) {
      const observer = new ResizeObserver(() => {
        updatePages();
      });
      
      observer.observe(editorRef.current);
      
      return () => {
        observer.disconnect();
      };
    }
  }, [editor]);

  if (!editor) return null;

  const handleExport = async (format) => {
    const content = editor.getHTML();
    const title = 'document';

    switch (format) {
      case 'pdf':
        const element = document.createElement('div');
        element.innerHTML = content;
        
        // Update export styles
        element.style.cssText = `
          width: ${PAGE_WIDTH}px;
          padding: ${PAGE_PADDING}px;
          box-sizing: border-box;
          font-family: "Times New Roman", Times, serif;
          line-height: 1.5;
          background-color: white;
          color: black;
          margin: 0 auto;
          white-space: pre-wrap;       /* Preserve whitespace and wrapping */
          word-wrap: break-word;       /* Break words only when necessary */
          overflow-wrap: break-word;   /* Modern version of word-wrap */
          word-break: keep-all;        /* Prevent word breaking */
          -webkit-hyphens: none;       /* Disable hyphenation */
          -ms-hyphens: none;
          hyphens: none;
        `;
        
        // Update print styles
        const style = document.createElement('style');
        style.textContent = `
          @page {
            size: A4;
            margin: 48px;
          }

          @media print {
            * {
              background-color: white !important;
              color: black !important;
              -webkit-print-color-adjust: exact;
              white-space: pre-wrap !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
              word-break: keep-all !important;
              -webkit-hyphens: none !important;
              -ms-hyphens: none !important;
              hyphens: none !important;
            }

            /* ... rest of your print styles ... */
          }
        `;
        element.appendChild(style);

        const opt = {
          margin: [48, 48, 48, 48], // Top, right, bottom, left margins
          filename: `${title}.pdf`,
          image: { 
            type: 'jpeg', 
            quality: 0.98 
          },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollX: 0,
            scrollY: 0,
            backgroundColor: '#FFF',
            windowWidth: PAGE_WIDTH + (PAGE_PADDING * 2)
          },
          jsPDF: { 
            unit: 'pt', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true,
            precision: 16,
            putOnlyUsedFonts: true
          }
        };

        try {
          await html2pdf()
            .set(opt)
            .from(element)
            .save();
        } catch (error) {
          console.error('PDF generation failed:', error);
        }
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

      default:
        console.error('Unsupported format');
    }
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-64px)] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <Toolbar editor={editor} onExport={handleExport} isDarkMode={isDarkMode} />
      </div>
      <div className="flex-grow overflow-auto">
        <div 
          className="mx-auto bg-white shadow-lg"
          ref={editorRef}
          style={{
            width: PAGE_WIDTH,
            minHeight: PAGE_HEIGHT,
            padding: PAGE_PADDING,
          }}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
} 