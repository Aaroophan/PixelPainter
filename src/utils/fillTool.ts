import { Color } from '../types';

export const fillArea = (
  grid: Color[][],
  startRow: number,
  startCol: number,
  newColor: Color,
  setPixelColor: (row: number, col: number, color: Color) => void
) => {
  const currentColor = grid[startRow][startCol];
  
  // If current color is already the target color, do nothing
  if (currentColor === newColor) {
    return;
  }
  
  // Flood fill algorithm using a queue
  const queue: [number, number][] = [[startRow, startCol]];
  const visited: boolean[][] = Array(grid.length)
    .fill(null)
    .map(() => Array(grid[0].length).fill(false));
  
  while (queue.length > 0) {
    const [row, col] = queue.shift()!;
    
    // Skip if out of bounds, visited, or different from the target color
    if (
      row < 0 || 
      row >= grid.length || 
      col < 0 || 
      col >= grid[0].length || 
      visited[row][col] || 
      grid[row][col] !== currentColor
    ) {
      continue;
    }
    
    // Mark as visited and fill with new color
    visited[row][col] = true;
    setPixelColor(row, col, newColor);
    
    // Add neighbors to queue
    queue.push([row - 1, col]); // Up
    queue.push([row + 1, col]); // Down
    queue.push([row, col - 1]); // Left
    queue.push([row, col + 1]); // Right
  }
};