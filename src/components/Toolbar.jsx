import { 
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
  Heading3, FileText, Download
} from 'lucide-react'
import { useState, useRef } from 'react'
import useThemeStore from '../store/themeStore'
import { useClickOutside } from '../hooks/useClickOutside'

const TEXT_COLORS = [
  '#000000', '#434343', '#666666', '#999999', 
  '#FF0000', '#FF4D00', '#FF9900', '#FFCC00',
  '#00FF00', '#00FF99', '#00CCFF', '#0066FF',
  '#7F00FF', '#CC00FF', '#FF00CC', '#FF0066'
];

const HIGHLIGHT_COLORS = [
  '#FFFF00', '#FFFF99', '#FFE5CC', '#FFB366',
  '#99FF99', '#99FFCC', '#99FFFF', '#99CCFF',
  '#CC99FF', '#FF99FF', '#FF99CC', '#FF9999',
  '#FFFFFF', '#CCCCCC', '#999999', '#666666'
];

export default function Toolbar({ editor, onExport, isDarkMode }) {
  if (!editor) return null

  const { isDarkMode: themeIsDarkMode } = useThemeStore()

  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef(null);

  useClickOutside(exportMenuRef, () => setShowExportMenu(false));

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
    editor.chain()
      .focus()
      .setMark('textStyle', { fontSize: size })
      .run();
  };

  const setColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  const setHighlight = (color) => {
    editor.chain().focus().setHighlight({ color }).run();
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

  const ColorPicker = ({ onColorChange, colors, title, isDarkMode }) => {
    const [showPalette, setShowPalette] = useState(false);
    
    return (
      <div className="relative">
        <button
          onClick={() => setShowPalette(!showPalette)}
          className={`p-1 rounded ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
          title={title}
        >
          <div className="w-6 h-6 border rounded overflow-hidden">
            <input
              type="color"
              onChange={(e) => onColorChange(e.target.value)}
              className="w-8 h-8 -m-1 cursor-pointer"
            />
          </div>
        </button>
        
        {showPalette && (
          <div className={`absolute z-50 mt-1 p-2 rounded-lg shadow-lg border grid grid-cols-4 gap-1 ${
            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
          }`}>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onColorChange(color);
                  setShowPalette(false);
                }}
                className="w-6 h-6 rounded border border-gray-300 hover:opacity-80"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
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

  const TableMenu = ({ editor, isDarkMode }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);

    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${editor.isActive('table') ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' : ''}`}
          title="Table"
        >
          <Table className="w-4 h-4" />
        </button>

        {showMenu && (
          <div className={`absolute z-50 mt-2 p-3 rounded-lg shadow-lg border min-w-[180px] ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-200' 
              : 'bg-white border-gray-200 text-gray-800'
          }`}>
            {!editor.isActive('table') ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <label>Rows:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rows}
                    onChange={(e) => setRows(parseInt(e.target.value))}
                    className={`w-16 px-1 py-0.5 border rounded text-sm ${
                      isDarkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-200' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <label>Cols:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={cols}
                    onChange={(e) => setCols(parseInt(e.target.value))}
                    className={`w-16 px-1 py-0.5 border rounded text-sm ${
                      isDarkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-200' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <button
                  onClick={() => {
                    editor.chain().focus().insertTable({ rows, cols }).run();
                    setShowMenu(false);
                  }}
                  className={`w-full px-3 py-1 text-sm rounded ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Insert Table
                </button>
              </div>
            ) : (
              <div className="text-sm space-y-1">
                <TableButton onClick={() => editor.chain().focus().addColumnBefore().run()}>
                  Add Column Before
                </TableButton>
                <TableButton onClick={() => editor.chain().focus().addColumnAfter().run()}>
                  Add Column After
                </TableButton>
                <TableButton onClick={() => editor.chain().focus().addRowBefore().run()}>
                  Add Row Before
                </TableButton>
                <TableButton onClick={() => editor.chain().focus().addRowAfter().run()}>
                  Add Row After
                </TableButton>
                <hr className={isDarkMode ? 'border-gray-600' : 'border-gray-200'} />
                <TableButton onClick={() => editor.chain().focus().deleteColumn().run()} danger>
                  Delete Column
                </TableButton>
                <TableButton onClick={() => editor.chain().focus().deleteRow().run()} danger>
                  Delete Row
                </TableButton>
                <TableButton onClick={() => editor.chain().focus().deleteTable().run()} danger>
                  Delete Table
                </TableButton>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const TableButton = ({ onClick, children, danger }) => {
    const { isDarkMode } = useThemeStore();
    return (
      <button
        onClick={onClick}
        className={`w-full px-2 py-1 text-left rounded text-sm ${
          danger 
            ? 'text-red-500 hover:bg-red-500/10' 
            : isDarkMode 
              ? 'hover:bg-gray-600' 
              : 'hover:bg-gray-100'
        }`}
      >
        {children}
      </button>
    );
  };

  const getActiveHeading = () => {
    const activeHeading = editor.getAttributes('heading');
    return activeHeading?.level ? activeHeading.level.toString() : '0';
  };

  return (
    <div className={`sticky top-0 z-10 p-2 border-b shadow-sm flex flex-wrap gap-1 items-center ${
      isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
    }`}>
      {/* Move heading selector to the start */}
      <select
        onChange={event => {
          const level = event.target.value;
          if (level === '0') {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: parseInt(level) }).run();
          }
        }}
        value={getActiveHeading()}
        className={`h-8 px-2 border rounded hover:bg-opacity-80 ${
          isDarkMode 
            ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600' 
            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
        }`}
      >
        <option value="0">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
      </select>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Add subscript/superscript buttons */}
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={`p-2 rounded ${
          isDarkMode 
            ? 'hover:bg-gray-700 text-gray-200' 
            : 'hover:bg-gray-100 text-gray-800'
        } ${
          editor.isActive('superscript') 
            ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
            : ''
        }`}
        title="Superscript"
      >
        <Superscript className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={`p-2 rounded ${
          isDarkMode 
            ? 'hover:bg-gray-700 text-gray-200' 
            : 'hover:bg-gray-100 text-gray-800'
        } ${
          editor.isActive('subscript') 
            ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
            : ''
        }`}
        title="Subscript"
      >
        <Subscript className="w-4 h-4" />
      </button>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Font Controls */}
      <div className="flex gap-1 items-center">
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className={`h-8 px-2 border rounded hover:bg-opacity-80 min-w-[120px] ${
            isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-800 border-gray-300'
          }`}
          value={editor.getAttributes('textStyle').fontFamily || '"Times New Roman", Times, serif'}
        >
          {fontFamilies.map(font => (
            <option key={font.value} value={font.value}>{font.name}</option>
          ))}
        </select>
        
        <select
          onChange={(e) => setFontSize(e.target.value)}
          value={editor.getAttributes('textStyle').fontSize || '12pt'}
          className={`h-8 px-2 border rounded hover:bg-opacity-80 w-16 ${
            isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-800 border-gray-300'
          }`}
        >
          {[
            '8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', 
            '22pt', '24pt', '26pt', '28pt', '36pt', '48pt', '72pt'
          ].map((size) => (
            <option key={size} value={size}>
              {size.replace('pt', '')}
            </option>
          ))}
        </select>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Text Formatting */}
      <div className="flex gap-1 items-center">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive('bold') 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Bold"
        >
          <BsTypeBold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive('italic') 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Italic"
        >
          <BsTypeItalic className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive('underline') 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Underline"
        >
          <BsTypeUnderline className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive('strike') 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Strikethrough"
        >
          <BsTypeStrikethrough className="w-4 h-4" />
        </button>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Colors */}
      <div className="flex gap-1">
        <ColorPicker
          onColorChange={setColor}
          colors={TEXT_COLORS}
          title="Text Color"
          isDarkMode={isDarkMode}
        />
        <ColorPicker
          onColorChange={setHighlight}
          colors={HIGHLIGHT_COLORS}
          title="Highlight Color"
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Text Alignment */}
      <div className="flex gap-1 items-center">
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive({ textAlign: 'left' }) 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive({ textAlign: 'center' }) 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive({ textAlign: 'right' }) 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive({ textAlign: 'justify' }) 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
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
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive('bulletList') 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive('orderedList') 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive('blockquote') 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive('codeBlock') 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
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
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            editor.isActive('link') 
              ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200' 
              : ''
          }`}
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>
        <TableMenu editor={editor} isDarkMode={isDarkMode} />
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* History */}
      <div className="flex gap-1 items-center">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            !editor.can().undo() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          } ${
            !editor.can().redo() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      {/* Export Menu */}
      <div className="relative" ref={exportMenuRef}>
        <button
          onClick={() => setShowExportMenu(!showExportMenu)}
          className={`p-2 rounded ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-800'
          }`}
          title="Export"
        >
          <Download className="w-4 h-4" />
        </button>

        {showExportMenu && (
          <div className={`absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-lg z-50 border ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-200' 
              : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <button
              onClick={() => {
                onExport('pdf');
                setShowExportMenu(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center ${
                isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
              }`}
            >
              <FaFilePdf className="w-4 h-4 mr-2" />
              Export as PDF
            </button>
            <button
              onClick={() => {
                onExport('html');
                setShowExportMenu(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center ${
                isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Export as HTML
            </button>
            <button
              onClick={() => {
                onExport('text');
                setShowExportMenu(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center ${
                isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Export as Text
            </button>
          </div>
        )}
      </div>
    </div>
  )
}