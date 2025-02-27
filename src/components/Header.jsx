import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import useThemeStore from '../store/themeStore';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <img src="/bock_logo.png" alt="Bock Docs Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Bock Docs</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
            {isDarkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-600" />}
          </button>

          {/* User Authentication */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img 
                  src={user.photoURL || '/default-avatar.png'} 
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {user.displayName || user.email}
                </span>
              </button>
              
              {showUserMenu && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                      {user.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/signin" 
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;