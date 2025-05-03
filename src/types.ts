export type Color = string;
export type Grid = Color[][];

export type ToolType = 'draw' | 'erase' | 'fill';

export interface PixelArtData {
  grid: Grid;
  gridSize: number;
}