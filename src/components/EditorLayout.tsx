import React from 'react';
import PixelGrid from './PixelGrid';
import Toolbar from './Toolbar';
import ColorPalette from './ColorPalette';
import ExportPanel from './ExportPanel';
import GridSettings from './GridSettings';
import { useTheme } from '../context/ThemeContext';
import { Instagram, Linkedin, Github, Store } from 'lucide-react';

const EditorLayout: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <header className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h1 className="text-xl font-bold">PixelPainter</h1>
        </div>
        <ThemeToggle />
      </header>
      
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <GridSettings />
          <div className="flex flex-col items-center">
            <PixelGrid />
          </div>
        </div>
        
        <div className="lg:col-span-3 flex flex-col gap-6">
          <Toolbar />
          <ColorPalette />
          <ExportPanel />
        </div>
      </main>
    </div>
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto px-4">
        <hr className="border-gray-700 mb-4" />
        <div className="text-center">
          <a
            href="http://aaroophan.onrender.com/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            &copy; 2025
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocKNRvtI3cvci9DHfzBfC3d0PgPneG86fZv7w5se1U5mfBgcNqXj4g=s83-c-mo"
              alt="Aaroophan"
              className="h-5 w-5 rounded-full"
            />
            Aaroophan
          </a>

          <ul className="flex justify-center gap-4 mt-4">
            <li>
              <a
                href="http://aaroophan.onrender.com"
                aria-label="Portfolio"
                className="hover:text-white transition-colors duration-200"
              >
                <Store size={15} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/aaroophan/?theme=dark"
                aria-label="Instagram"
                className="hover:text-white transition-colors duration-200"
              >
                <Instagram size={15} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/aaroophan"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors duration-200"
              >
                <Linkedin size={15} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Aaroophan"
                aria-label="GitHub"
                className="hover:text-white transition-colors duration-200"
              >
                <Github size={15} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    </>
  );
};

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default EditorLayout;