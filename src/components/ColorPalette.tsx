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
            className={`w-8 h-8 rounded-md transition-all duration-200 ${selectedColor === color
                ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-blue-500 shadow-lg'
                : 'hover:scale-110 hover:shadow-lg'
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
              className="flex-1 px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addCustomColor}
              className="px-3 py-1 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-md hover:from-sky-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/30 text-sm"
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