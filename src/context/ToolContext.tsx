import React, { createContext, useContext, useState } from 'react';

type ToolType = 'draw' | 'erase' | 'fill';

interface ToolContextType {
  selectedTool: ToolType;
  selectedColor: string;
  setSelectedTool: (tool: ToolType) => void;
  setSelectedColor: (color: string) => void;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useTool must be used within a ToolProvider');
  }
  return context;
};

export const ToolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState<ToolType>('draw');
  const [selectedColor, setSelectedColor] = useState('#000000');

  const value = {
    selectedTool,
    selectedColor,
    setSelectedTool,
    setSelectedColor,
  };

  return <ToolContext.Provider value={value}>{children}</ToolContext.Provider>;
};