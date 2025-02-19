import { useTheme } from '../store/themeStore'

export default function EditorFooter({ wordCount, lastSaved, saving }) {
  const { isDarkMode } = useTheme()
  
  return (
    <div className={`p-2 border-t flex justify-between items-center text-sm
      ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'}`}
    >
      <div>Words: {wordCount}</div>
      <div>
        {saving ? 'Saving...' : lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : ''}
      </div>
    </div>
  )
}