import React from 'react';
import { usePixelArt } from '../context/PixelArtContext';
import { MinusCircle, PlusCircle } from 'lucide-react';

const GridSettings: React.FC = () => {
  const { gridSize, setGridSize, zoom, setZoom } = usePixelArt();
  
  const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGridSize(parseInt(e.target.value, 10));
  };

  const increaseZoom = () => {
    if (zoom < 4) setZoom(zoom + 0.5);
  };

  const decreaseZoom = () => {
    if (zoom > 0.5) setZoom(zoom - 0.5);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-wrap items-center justify-between gap-4">
      <div>
        <label htmlFor="grid-size" className="block text-sm font-medium mb-1">
          Grid Size
        </label>
        <select
          id="grid-size"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="py-1.5 px-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={8}>8 × 8</option>
          <option value={16}>16 × 16</option>
          <option value={32}>32 × 32</option>
          <option value={64}>64 × 64</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Zoom</label>
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseZoom}
            disabled={zoom <= 0.5}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Zoom Out"
          >
            <MinusCircle size={18} />
          </button>
          
          <span className="font-medium w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          
          <button
            onClick={increaseZoom}
            disabled={zoom >= 4}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Zoom In"
          >
            <PlusCircle size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 text-right">
        <label className="block text-sm font-medium mb-1">Preview</label>
        <div className="inline-block bg-gray-200 dark:bg-gray-700 rounded p-1">
          <div 
            className="preview-container"
            style={{
              width: `${gridSize * 1}px`, 
              height: `${gridSize * 1}px`,
              position: 'relative',
              transform: 'scale(1.5)',
              transformOrigin: 'top right'
            }}
          >
            {/* Preview will be rendered by SVGPreview component inside ExportPanel */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridSettings;