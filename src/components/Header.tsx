import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Quote } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              PhraseUp
            </Link>
          </div>

          <nav className="flex items-center space-x-6">
            <Link
              to="/quotes"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/quotes'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Quotes
            </Link>
            <Link
              to="/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/settings'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Settings
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
