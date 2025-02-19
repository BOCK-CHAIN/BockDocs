import React, { useState } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Link as LinkIcon, Undo, Redo,
  Type, FileDown, Palette
} from 'lucide-react';

const EditorToolbar = ({ editor, onExportPDF, onExportDOCX }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="sticky top-16 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap items-center gap-1 p-2">
        {/* Text Style */}
        <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('bold') ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <Bold className="w-4 h-4" />
          </button>
          {/* Add other formatting buttons similarly */}
        </div>

        {/* Alignment */}
        <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          {/* Add other alignment buttons */}
        </div>

        {/* Lists */}
        <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('bulletList') ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          {/* Add ordered list button */}
        </div>

        {/* Headings dropdown */}
        <div className="relative">
          {/* Add heading dropdown implementation */}
        </div>

        {/* Color picker */}
        <div className="relative">
          {/* Add color picker implementation */}
        </div>

        {/* Export options */}
        <div className="flex items-center space-x-1 border-l border-gray-200 dark:border-gray-700 pl-2">
          <button
            onClick={onExportPDF}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Export as PDF"
          >
            <FileDown className="w-4 h-4" />
          </button>
          {/* Add DOCX export button */}
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar; 