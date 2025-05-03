import React, { useRef, useEffect, useState } from 'react';
import { usePixelArt } from '../context/PixelArtContext';
import { useTool } from '../context/ToolContext';
import { fillArea } from '../utils/fillTool';

const PixelGrid: React.FC = () => {
  const { grid, setPixelColor, gridSize, zoom } = usePixelArt();
  const { selectedTool, selectedColor } = useTool();
  const [isDrawing, setIsDrawing] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const lastPixelRef = useRef<{ row: number, col: number } | null>(null);

  const handlePixelClick = (row: number, col: number, isRightClick = false) => {
    if (isRightClick) {
      // Right click to erase
      setPixelColor(row, col, '');
      return;
    }

    if (selectedTool === 'draw') {
      setPixelColor(row, col, selectedColor);
    } else if (selectedTool === 'erase') {
      setPixelColor(row, col, '');
    } else if (selectedTool === 'fill') {
      // Use the fill algorithm
      fillArea(grid, row, col, selectedColor, setPixelColor);
    }
  };

  const handleMouseDown = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    lastPixelRef.current = { row, col };
    handlePixelClick(row, col, e.button === 2);
  };

  const handleMouseMove = (row: number, col: number) => {
    if (!isDrawing) return;
    
    // Only update if we're on a different pixel
    if (lastPixelRef.current?.row !== row || lastPixelRef.current?.col !== col) {
      lastPixelRef.current = { row, col };
      
      if (selectedTool === 'draw' || selectedTool === 'erase') {
        handlePixelClick(row, col, selectedTool === 'erase');
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Set up context menu prevention
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (gridRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const pixelSize = Math.max(6, Math.min(24, Math.floor(40 / gridSize) * zoom));

  return (
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto">
      <div 
        ref={gridRef}
        className="grid border border-gray-300 dark:border-gray-600" 
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${gridSize}, ${pixelSize}px)`,
        }}
      >
        {grid.map((row, rowIndex) => 
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                border border-gray-200 dark:border-gray-700
                cursor-crosshair transition-colors duration-100
                ${selectedTool === 'erase' ? 'hover:bg-red-100 dark:hover:bg-red-900/30' : 'hover:bg-blue-100 dark:hover:bg-blue-900/30'}
              `}
              style={{ 
                backgroundColor: color || 'transparent',
                width: `${pixelSize}px`, 
                height: `${pixelSize}px`,
              }}
              onMouseDown={(e) => handleMouseDown(rowIndex, colIndex, e)}
              onMouseMove={() => handleMouseMove(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PixelGrid;