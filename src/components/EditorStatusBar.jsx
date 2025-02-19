import React from 'react';

const EditorStatusBar = ({ wordCount = 0, saving, lastSaved }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="max-w-5xl mx-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div>
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </div>
        <div>
          {saving ? (
            'Saving...'
          ) : lastSaved ? (
            `Last saved ${new Date(lastSaved).toLocaleTimeString()}`
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EditorStatusBar; 