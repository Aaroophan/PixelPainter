import React from 'react';
import { useTool } from '../context/ToolContext';
import { usePixelArt } from '../context/PixelArtContext';
import { Brush, Eraser, PaintBucket, Undo, Redo, Save, RotateCcw } from 'lucide-react';

const Toolbar: React.FC = () => {
  const { selectedTool, setSelectedTool } = useTool();
  const { canUndo, canRedo, undo, redo, clearGrid, saveToLocalStorage, loadFromLocalStorage } = usePixelArt();

  const tools = [
    { id: 'draw', name: 'Draw', icon: <Brush size={20} /> },
    { id: 'erase', name: 'Erase', icon: <Eraser size={20} /> },
    { id: 'fill', name: 'Fill', icon: <PaintBucket size={20} /> },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">Tools</h2>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`
              flex items-center justify-center p-3 rounded-lg transition-colors
              ${selectedTool === tool.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'}
            `}
            onClick={() => setSelectedTool(tool.id)}
            title={tool.name}
          >
            {tool.icon}
          </button>
        ))}

        <div className="w-px h-10 bg-gray-300 dark:bg-gray-600 mx-1"></div>

        <button
          className="flex items-center justify-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 
                  hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={undo}
          disabled={!canUndo}
          title="Undo"
        >
          <Undo size={20} />
        </button>

        <button
          className="flex items-center justify-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 
                  hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={redo}
          disabled={!canRedo}
          title="Redo"
        >
          <Redo size={20} />
        </button>

        <div className="w-px h-10 bg-gray-300 dark:bg-gray-600 mx-1"></div>

        <button
          className="flex items-center justify-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 
                  hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
          onClick={saveToLocalStorage}
          title="Save"
        >
          <Save size={20} />
        </button>

        <button
          className="flex items-center justify-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 
                  hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
          onClick={loadFromLocalStorage}
          title="Load"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M2 15h10"></path>
            <path d="M9 18l3-3-3-3"></path>
          </svg>
        </button>

        <button
          className="flex items-center justify-center p-3 rounded-lg bg-red-100 dark:bg-red-900 
                  hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-200 transition-colors"
          onClick={clearGrid}
          title="Clear Canvas"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;