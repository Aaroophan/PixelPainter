import React, { useState } from 'react';
import { useTool } from '../context/ToolContext';

const DEFAULT_PALETTE = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', 
  '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#008000', '#800000',
  '#808080', '#C0C0C0', '#FFC0CB', '#A52A2A'
];

const ColorPalette: React.FC = () => {
  const { selectedColor, setSelectedColor } = useTool();
  const [customColor, setCustomColor] = useState('#3B82F6');

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
  };

  const addCustomColor = () => {
    setSelectedColor(customColor);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">Color Palette</h2>
      <div className="grid grid-cols-8 gap-2 mb-4">
        {DEFAULT_PALETTE.map((color, index) => (
          <button
            key={index}
            className={`w-8 h-8 rounded-md border-2 ${
              selectedColor === color 
                ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-300' 
                : 'border-gray-300 dark:border-gray-700'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            title={color}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Custom Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-8 h-8 rounded bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              onClick={addCustomColor}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;