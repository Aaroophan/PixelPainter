import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type Color = string;
type Grid = Color[][];

interface HistoryState {
  past: Grid[];
  present: Grid;
  future: Grid[];
}

interface PixelArtContextType {
  grid: Grid;
  gridSize: number;
  zoom: number;
  setGridSize: (size: number) => void;
  setZoom: (zoom: number) => void;
  setPixelColor: (row: number, col: number, color: Color) => void;
  setGrid: (grid: Grid) => void;
  clearGrid: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const PixelArtContext = createContext<PixelArtContextType | undefined>(undefined);

export const usePixelArt = () => {
  const context = useContext(PixelArtContext);
  if (!context) {
    throw new Error('usePixelArt must be used within a PixelArtProvider');
  }
  return context;
};

export const PixelArtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gridSize, setGridSize] = useState(16);
  const [zoom, setZoom] = useState(1);
  
  const initialGrid = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(''));
  
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialGrid,
    future: [],
  });

  // Recreate the grid when the grid size changes
  useEffect(() => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(''));
    
    // Copy existing data if possible
    for (let i = 0; i < Math.min(gridSize, history.present.length); i++) {
      for (let j = 0; j < Math.min(gridSize, history.present[i].length); j++) {
        newGrid[i][j] = history.present[i][j];
      }
    }
    
    setHistory({
      past: [],
      present: newGrid,
      future: [],
    });
  }, [gridSize]);

  const setPixelColor = useCallback((row: number, col: number, color: Color) => {
    setHistory(prev => {
      // Create a deep copy of the present grid
      const newGrid = prev.present.map(rowArray => [...rowArray]);
      
      // Make the change
      newGrid[row][col] = color;
      
      return {
        past: [...prev.past, prev.present],
        present: newGrid,
        future: [],
      };
    });
  }, []);

  const setGrid = useCallback((newGrid: Grid) => {
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: newGrid,
      future: [],
    }));
  }, []);

  const clearGrid = useCallback(() => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(''));
    
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: newGrid,
      future: [],
    }));
  }, [gridSize]);

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.past.length === 0) return prev;
      
      const newPast = [...prev.past];
      const previousGrid = newPast.pop();
      
      return {
        past: newPast,
        present: previousGrid!,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory(prev => {
      if (prev.future.length === 0) return prev;
      
      const newFuture = [...prev.future];
      const nextGrid = newFuture.shift();
      
      return {
        past: [...prev.past, prev.present],
        present: nextGrid!,
        future: newFuture,
      };
    });
  }, []);

  const saveToLocalStorage = useCallback(() => {
    try {
      const data = {
        grid: history.present,
        gridSize,
      };
      localStorage.setItem('pixel-art-data', JSON.stringify(data));
      alert('Design saved successfully!');
    } catch (error) {
      console.error('Error saving to local storage:', error);
      alert('Failed to save design.');
    }
  }, [history.present, gridSize]);

  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedData = localStorage.getItem('pixel-art-data');
      if (savedData) {
        const data = JSON.parse(savedData);
        setGridSize(data.gridSize);
        setHistory(prev => ({
          past: [...prev.past, prev.present],
          present: data.grid,
          future: [],
        }));
        alert('Design loaded successfully!');
      } else {
        alert('No saved design found.');
      }
    } catch (error) {
      console.error('Error loading from local storage:', error);
      alert('Failed to load design.');
    }
  }, []);

  const value = {
    grid: history.present,
    gridSize,
    zoom,
    setGridSize,
    setZoom,
    setPixelColor,
    setGrid,
    clearGrid,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    undo,
    redo,
    saveToLocalStorage,
    loadFromLocalStorage,
  };

  return (
    <PixelArtContext.Provider value={value}>
      {children}
    </PixelArtContext.Provider>
  );
};