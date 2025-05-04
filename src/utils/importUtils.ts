import { Grid } from '../types';

export const parseSvgToGrid = (svgString: string, gridSize: number): Grid => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svg = doc.querySelector('svg');

    if (!svg) {
        throw new Error('Invalid SVG format');
    }

    // Initialize empty grid
    const grid: Grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

    // Get all rect elements
    const rects = svg.querySelectorAll('rect');

    rects.forEach(rect => {
        const x = parseInt(rect.getAttribute('x') || '0', 10);
        const y = parseInt(rect.getAttribute('y') || '0', 10);
        const fill = rect.getAttribute('fill');

        // Convert coordinates back to grid positions (accounting for 10x10 scaling)
        const col = Math.floor(x / 10);
        const row = Math.floor(y / 10);

        // Only add to grid if within bounds and has a fill color
        if (row >= 0 && row < gridSize && col >= 0 && col < gridSize && fill) {
            grid[row][col] = fill;
        }
    });

    return grid;
};