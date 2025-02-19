import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaListUl, FaListOl, FaUndo, FaRedo, FaLink, FaFileDownload,
  FaImage, FaTable, FaHighlighter, FaPalette, FaTextHeight,
  FaQuoteRight, FaCode, FaSubscript, FaSuperscript,
  FaIndent, FaOutdent, FaEraser, FaParagraph,
  FaHeading, FaFilePdf, FaFileWord, FaFileImage
} from 'react-icons/fa'
import { BsTypeBold, BsTypeItalic, BsTypeUnderline, BsTypeStrikethrough } from 'react-icons/bs'
import { 
  Bold, Italic, Underline, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Link, Undo, Redo, Image,
  Table, Type, FileDown, Palette, Highlighter,
  ChevronDown, Quote, Code, Superscript, Subscript,
  Indent, Outdent, Eraser, Heading1, Heading2, 
  Heading3, FileText, Paperclip, Divide
} from 'lucide-react'

export default function Toolbar({ editor, onExport }) {
  if (!editor) return null

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL', previousUrl)
    if (url === null) {
      return
    }
    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().setLink({ href: url }).run()
  }

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
  }

  const setFontSize = (size) => {
    editor.chain().focus().setFontSize(size).run();
    editor.commands.focus();
  };

  const fontSizes = [
    { label: '8', value: '8pt' },
    { label: '9', value: '9pt' },
    { label: '10', value: '10pt' },
    { label: '11', value: '11pt' },
    { label: '12', value: '12pt' },
    { label: '14', value: '14pt' },
    { label: '16', value: '16pt' },
    { label: '18', value: '18pt' },
    { label: '20', value: '20pt' },
    { label: '22', value: '22pt' },
    { label: '24', value: '24pt' },
    { label: '26', value: '26pt' },
    { label: '28', value: '28pt' },
    { label: '36', value: '36pt' },
    { label: '48', value: '48pt' },
    { label: '72', value: '72pt' }
  ];

  const fontFamilies = [
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
  ];

  const headingLevels = [
    { label: 'Paragraph', value: 0 },
    { label: 'Heading 1', value: 1 },
    { label: 'Heading 2', value: 2 },
    { label: 'Heading 3', value: 3 },
    { label: 'Heading 4', value: 4 },
    { label: 'Heading 5', value: 5 },
    { label: 'Heading 6', value: 6 },
  ];

  const ColorPicker = ({ editor }) => {
    const colors = [
      { value: '#000000', label: 'Black' },
      { value: '#343A40', label: 'Dark Gray' },
      { value: '#495057', label: 'Gray' },
      { value: '#868E96', label: 'Medium Gray' },
      { value: '#CED4DA', label: 'Light Gray' },
      { value: '#1864AB', label: 'Blue' },
      { value: '#2B8A3E', label: 'Green' },
      { value: '#C92A2A', label: 'Red' },
      { value: '#E67700', label: 'Orange' },
      { value: '#5F3DC4', label: 'Purple' }
    ];

    return (
      <div className="relative group">
        <button 
          className="p-2 rounded hover:bg-gray-200 flex items-center gap-1"
          title="Text Color"
        >
          <Palette className="w-4 h-4" />
          <ChevronDown className="w-3 h-3" />
        </button>
        <div className="absolute z-10 hidden group-hover:block p-2 bg-white shadow-lg rounded border border-gray-300 min-w-[200px]">
          <div className="grid grid-cols-5 gap-1">
            {colors.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => editor.chain().focus().setColor(value).run()}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer tooltip"
                style={{ backgroundColor: value }}
                title={label}
              />
            ))}
          </div>
          <button
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="w-full mt-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            Remove color
          </button>
        </div>
      </div>
    );
  };

  const HighlightColorPicker = ({ editor }) => {
    const highlightColors = [
      { value: '#FFF3BF', label: 'Yellow' },
      { value: '#D3F9D8', label: 'Green' },
      { value: '#FFE3E3', label: 'Red' },
      { value: '#D0EBFF', label: 'Blue' },
      { value: '#FFE8CC', label: 'Orange' },
      { value: '#E5DBFF', label: 'Purple' },
      { value: '#FFF0F6', label: 'Pink' },
      { value: '#F8F9FA', label: 'Light Gray' },
      { value: '#F1F3F5', label: 'Gray' },
      { value: '#E9ECEF', label: 'Dark Gray' }
    ];

    return (
      <div className="relative group">
        <button 
          className="p-2 rounded hover:bg-gray-200 flex items-center gap-1"
          title="Highlight Color"
        >
          <Highlighter className="w-4 h-4" />
          <ChevronDown className="w-3 h-3" />
        </button>
        <div className="absolute z-10 hidden group-hover:block p-2 bg-white shadow-lg rounded border border-gray-300 min-w-[200px]">
          <div className="grid grid-cols-5 gap-1">
            {highlightColors.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => editor.chain().focus().setHighlight({ color: value }).run()}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                style={{ backgroundColor: value }}
                title={label}
              />
            ))}
          </div>
          <button
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            className="w-full mt-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            Remove highlight
          </button>
        </div>
      </div>
    );
  };

  const insertHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run()
  }

  const ExportOptions = () => {
    return (
      <div className="relative group">
        <button 
          className={`p-2 rounded hover:bg-gray-200 flex items-center gap-1`}
          title="Export Options"
        >
          <FileDown />
          <ChevronDown className="w-3 h-3" />
        </button>
        <div className="absolute z-10 hidden group-hover:block right-0 p-2 bg-white shadow-lg rounded border border-gray-300 min-w-32">
          <button
            onClick={() => onExport('html')}
            className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-200 text-left"
          >
            <FileText className="w-4 h-4" /> HTML
          </button>
          <button
            onClick={() => onExport('pdf')}
            className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-200 text-left"
          >
            <FileText className="w-4 h-4" /> PDF
          </button>
          <button
            onClick={() => onExport('docx')}
            className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-200 text-left"
          >
            <FileText className="w-4 h-4" /> Word
          </button>
          <button
            onClick={() => onExport('markdown')}
            className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-200 text-left"
          >
            <FileText className="w-4 h-4" /> Markdown
          </button>
          <button
            onClick={() => onExport('text')}
            className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-200 text-left"
          >
            <FileText className="w-4 h-4" /> Plain Text
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="sticky top-0 z-10 p-2 border-b shadow-sm bg-white text-gray-800 flex flex-wrap gap-1 items-center">
      {/* Toolbar groups with visual separators */}
      <div className="flex gap-1 items-center">
        {/* Document Structure */}
        <div className="relative group">
          <button 
            className={`p-2 rounded hover:bg-gray-200 flex items-center gap-1 min-w-32`}
            title="Paragraph Format"
          >
            <Heading1 className="w-4 h-4" />
            <span className="text-sm">Paragraph</span>
            <ChevronDown className="w-3 h-3 ml-auto" />
          </button>
          <div className="absolute z-10 hidden group-hover:block left-0 p-1 bg-white shadow-lg rounded border border-gray-300 min-w-36">
            {headingLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => {
                  if (level.value === 0) {
                    editor.chain().focus().setParagraph().run()
                  } else {
                    editor.chain().focus().toggleHeading({ level: level.value }).run()
                  }
                }}
                className={`w-full flex items-center gap-2 px-3 py-1 text-left hover:bg-gray-200 ${
                  (level.value === 0 && editor.isActive('paragraph')) || 
                  (level.value > 0 && editor.isActive('heading', { level: level.value })) 
                    ? 'bg-gray-200' : ''
                }`}
              >
                {level.value === 0 ? (
                  <FaParagraph className="w-4 h-4" />
                ) : (
                  <span className="font-bold w-4 h-4 flex items-center justify-center">{level.value}</span>
                )}
                <span style={level.value > 0 ? {fontSize: `${20 - (level.value * 2)}px`} : {}}>
                  {level.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Font Controls */}
      <div className="flex gap-1 items-center">
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="h-8 px-2 border rounded hover:bg-gray-50 min-w-[120px] text-gray-800 bg-white"
          defaultValue='"Times New Roman", Times, serif'
        >
          {fontFamilies.map(font => (
            <option key={font.value} value={font.value}>{font.name}</option>
          ))}
        </select>
        
        <select
          onChange={(e) => setFontSize(e.target.value)}
          className="h-8 px-2 border rounded hover:bg-gray-50 w-16 text-gray-800 bg-white"
          value={editor.getAttributes('textStyle').fontSize || '12pt'}
        >
          {fontSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Text Formatting */}
      <div className="flex gap-1 items-center">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('bold') ? 'bg-gray-200' : ''
          }`}
          title="Bold (Ctrl+B)"
        >
          <BsTypeBold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('italic') ? 'bg-gray-200' : ''
          }`}
          title="Italic (Ctrl+I)"
        >
          <BsTypeItalic className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('underline') ? 'bg-gray-200' : ''
          }`}
          title="Underline (Ctrl+U)"
        >
          <BsTypeUnderline className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('strike') ? 'bg-gray-200' : ''
          }`}
          title="Strikethrough"
        >
          <BsTypeStrikethrough className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('superscript') ? 'bg-gray-200' : ''
          }`}
          title="Superscript"
        >
          <Superscript className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('subscript') ? 'bg-gray-200' : ''
          }`}
          title="Subscript"
        >
          <Subscript className="w-4 h-4" />
        </button>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Colors */}
      <div className="flex gap-1 items-center">
        <ColorPicker editor={editor} />
        <HighlightColorPicker editor={editor} />
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Text Alignment */}
      <div className="flex gap-1 items-center">
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
          }`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''
          }`}
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </button>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Lists & Indentation */}
      <div className="flex gap-1 items-center">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('bulletList') ? 'bg-gray-200' : ''
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('orderedList') ? 'bg-gray-200' : ''
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('blockquote') ? 'bg-gray-200' : ''
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('codeBlock') ? 'bg-gray-200' : ''
          }`}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Insert Elements */}
      <div className="flex gap-1 items-center">
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            editor.isActive('link') ? 'bg-gray-200' : ''
          }`}
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>
        <button
          onClick={insertTable}
          className="p-2 rounded hover:bg-gray-100 text-gray-800"
          title="Insert Table"
        >
          <Table className="w-4 h-4" />
        </button>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* History */}
      <div className="flex gap-1 items-center">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            !editor.can().undo() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${
            !editor.can().redo() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Export */}
      <div className="flex gap-1 items-center">
        <ExportOptions />
      </div>
    </div>
  )
}