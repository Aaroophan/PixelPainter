export const generateSvgString = (
  grid: string[][],
  gridSize: number,
  strokeWidth: number = 0
): string => {
  if (!grid || grid.length === 0) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0"></svg>';
  }

  let svgContent = '';

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row] && grid[row][col]) {
        const color = grid[row][col];
        if (color) {
          // Add a rect element for each colored pixel, scaling to 10x10
          svgContent += `<rect x="${col * 10}" y="${row * 10}" width="10" height="10" fill="${color}" ${strokeWidth > 0 ? `stroke="black" stroke-width="${strokeWidth}"` : ''
            } />`;
        }
      }
    }
  }

  // Create the SVG wrapper with proper viewBox scaled to 10x10 pixels per grid cell
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${gridSize * 10} ${gridSize * 10}" width="${gridSize * 10}" height="${gridSize * 10}">${svgContent}</svg>`;
};

export const generateComponentCode = (
  grid: string[][],
  gridSize: number,
  strokeWidth: number = 0,
  isTypeScript: boolean = false
): string => {
  if (!grid || grid.length === 0) {
    const props = isTypeScript
      ? '{ width = 0, height = 0, className = \'\' }: { width?: number; height?: number; className?: string }'
      : '{ width = 0, height = 0, className = \'\' }';

    return `import React from 'react';

const PixelArtIcon = (${props}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 0 0" 
      width={width} 
      height={height}
      className={className}
    />
  );
};

export default PixelArtIcon;`;
  }

  let pixelElements = '';

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row] && grid[row][col]) {
        const color = grid[row][col];
        if (color) {
          // Add a rect element for each colored pixel, scaling to 10x10
          pixelElements += `      <rect x="${col * 10}" y="${row * 10}" width="10" height="10" fill="${color}" ${strokeWidth > 0 ? `stroke="black" strokeWidth="${strokeWidth}"` : ''
            } />\n`;
        }
      }
    }
  }

  const props = isTypeScript
    ? `{ width = ${gridSize * 10}, height = ${gridSize * 10}, className = '' }: { width?: number; height?: number; className?: string }`
    : `{ width = ${gridSize * 10}, height = ${gridSize * 10}, className = '' }`;

  // Create a React component with scaled dimensions
  return `import React from 'react';

const PixelArtIcon = (${props}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 ${gridSize * 10} ${gridSize * 10}" 
      width={width} 
      height={height}
      className={className}
    >
${pixelElements}    </svg>
  );
};

export default PixelArtIcon;`;
};