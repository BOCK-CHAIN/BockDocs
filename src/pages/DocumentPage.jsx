import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Editor from '../components/Editor';
import { ChevronLeft } from 'lucide-react';

const DocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [title, setTitle] = useState('Untitled Document');
  const titleInputRef = useRef(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, 'documents', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const docData = docSnap.data();
          setDocument({ id: docSnap.id, ...docData });
          setTitle(docData.title || 'Untitled Document');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  const handleSave = async (content) => {
    setSaving(true);
    try {
      const docRef = doc(db, 'documents', id);
      await updateDoc(docRef, {
        content,
        title,
        lastModified: new Date().toISOString()
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    try {
      const docRef = doc(db, 'documents', id);
      await updateDoc(docRef, {
        title: newTitle,
        lastModified: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleTitleFocus = () => {
    titleInputRef.current?.select();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={handleTitleChange}
              onFocus={handleTitleFocus}
              className="font-medium text-gray-900 dark:text-white bg-transparent border-none focus:outline-none focus:ring-0 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
            />
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="h-[calc(100vh-4rem)]">
        <Editor 
          documentId={id} 
          initialContent={document?.content || '<p>Start typing...</p>'}
          onSave={handleSave}
          saving={saving}
          lastSaved={lastSaved}
        />
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="h-10 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <div>
              {saving ? 'Saving...' : lastSaved ? `Last saved ${new Date(lastSaved).toLocaleTimeString()}` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage; 