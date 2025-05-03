export const generateSvgString = (
  grid: string[][],
  gridSize: number,
  strokeWidth: number = 0
): string => {
  let svgContent = '';
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const color = grid[row][col];
      if (color) {
        // Add a rect element for each colored pixel
        svgContent += `<rect x="${col}" y="${row}" width="1" height="1" fill="${color}" ${
          strokeWidth > 0 ? `stroke="black" stroke-width="${strokeWidth}"` : ''
        } />`;
      }
    }
  }
  
  // Create the SVG wrapper with proper viewBox
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${gridSize} ${gridSize}" width="${gridSize}" height="${gridSize}">${svgContent}</svg>`;
};

export const generateJsxCode = (
  grid: string[][],
  gridSize: number,
  strokeWidth: number = 0
): string => {
  let pixelElements = '';
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const color = grid[row][col];
      if (color) {
        // Add a rect element for each colored pixel
        pixelElements += `      <rect x="${col}" y="${row}" width="1" height="1" fill="${color}" ${
          strokeWidth > 0 ? `stroke="black" strokeWidth="${strokeWidth}"` : ''
        } />\n`;
      }
    }
  }
  
  // Create a React component
  return `import React from 'react';

const PixelArtIcon = ({ width = ${gridSize}, height = ${gridSize}, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 ${gridSize} ${gridSize}" 
      width={width} 
      height={height}
      className={className}
    >
${pixelElements}    </svg>
  );
};

export default PixelArtIcon;`;
};