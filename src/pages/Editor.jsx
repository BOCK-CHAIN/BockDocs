import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { saveDocument, getDocument } from '../services/documentService';
import { exportToPdf, exportToDocx } from '../utils/exportDocument';
import EditorToolbar from '../components/EditorToolbar';
import EditorStatusBar from '../components/EditorStatusBar';

const Editor = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('Untitled Document');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
      }),
      CharacterCount.configure({
        limit: Infinity
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[500px] px-8 py-4',
      },
    },
    onUpdate: ({ editor }) => {
      // Trigger autosave
      handleAutosave(editor.getHTML());
    },
  });

  // Load document
  useEffect(() => {
    const loadDocument = async () => {
      if (id && user) {
        const doc = await getDocument(id);
        if (doc) {
          setTitle(doc.title);
          editor?.commands.setContent(doc.content);
        }
      }
    };
    loadDocument();
  }, [id, user, editor]);

  // Autosave
  const handleAutosave = debounce(async (content) => {
    if (!id || !user || !content) return;

    setSaving(true);
    try {
      await saveDocument(id, {
        content,
        title,
        lastModified: new Date(),
        userId: user.uid,
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  }, 2000);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            handleAutosave(editor?.getHTML());
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-full lg:max-w-5xl mx-auto px-4 lg:px-8">
        {/* Title */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl sm:text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white w-full"
            placeholder="Untitled Document"
          />
        </div>

        {/* Toolbar - Make it scrollable on mobile */}
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <EditorToolbar 
              editor={editor}
              onExportPDF={() => exportToPdf(editor?.getHTML(), title)}
              onExportDOCX={() => exportToDocx(editor?.getHTML(), title)}
            />
          </div>
        </div>

        {/* Editor Content */}
        <div className="bg-white dark:bg-gray-800 min-h-[calc(100vh-12rem)]">
          <div className="max-w-full overflow-x-auto">
            <EditorContent 
              editor={editor} 
              className="prose dark:prose-invert max-w-none focus:outline-none min-h-[500px] px-4 sm:px-6 lg:px-8 py-4"
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <EditorStatusBar
            wordCount={editor?.storage?.characterCount?.words() || 0}
            saving={saving}
            lastSaved={lastSaved}
            className="px-4 sm:px-6 lg:px-8 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Editor; 