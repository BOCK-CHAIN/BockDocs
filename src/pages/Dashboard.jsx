import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, Search, FileText, Trash2, Edit2, MoreVertical,
  Download, Folder
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserDocuments, deleteDocument, createDocument } from '../services/documentService';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      if (user) {
        try {
          const docs = await getUserDocuments(user.uid);
          setDocuments(docs);
          setFilteredDocs(docs);
        } catch (error) {
          console.error('Error fetching documents:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchDocuments();
  }, [user]);

  // Handle search
  useEffect(() => {
    const filtered = documents.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.content && doc.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredDocs(filtered);
  }, [searchQuery, documents]);

  const handleCreateNew = async () => {
    try {
      const newDoc = await createDocument(user.uid, {
        title: 'Untitled Document',
        content: '',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      });
      navigate(`/document/${newDoc.id}`);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const handleDelete = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(docId);
        // Update local state after successful deletion
        setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== docId));
        setFilteredDocs(prevDocs => prevDocs.filter(doc => doc.id !== docId));
        setSelectedDoc(null);
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Failed to delete document. Please try again.');
      }
    }
  };

  const formatLastModified = (date) => {
    if (!date) return 'Never modified';
    try {
      const d = new Date(date);
      return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Documents</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {documents.length} document{documents.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Document
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Documents Grid */}
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {doc.title || 'Untitled Document'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last modified: {formatLastModified(doc.lastModified)}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </button>
                      
                      {selectedDoc === doc.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                          <div className="py-1">
                            <Link
                              to={`/document/${doc.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(doc.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
                  <Link
                    to={`/document/${doc.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    Open Document
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? 'Try a different search term' : 'Create your first document to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 