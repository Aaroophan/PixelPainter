import React, { useState, useRef } from 'react';
import { usePixelArt } from '../context/PixelArtContext';
import { generateSvgString, generateComponentCode } from '../utils/exportUtils';
import { parseSvgToGrid } from '../utils/importUtils';
import { Copy, Download, Upload } from 'lucide-react';

const ExportPanel: React.FC = () => {
  const { grid, gridSize, setGrid } = usePixelArt();
  const [exportType, setExportType] = useState<'svg' | 'jsx' | 'tsx'>('svg');
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [copiedState, setCopiedState] = useState<'none' | 'svg' | 'jsx' | 'tsx'>('none');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const svgString = generateSvgString(grid, gridSize, strokeWidth);
  const componentCode = generateComponentCode(grid, gridSize, strokeWidth, exportType === 'tsx');

  const handleCopy = (type: 'svg' | 'jsx' | 'tsx') => {
    if (type === 'svg') {
      navigator.clipboard.writeText(svgString);
    } else {
      navigator.clipboard.writeText(componentCode);
    }

    setCopiedState(type);
    setTimeout(() => setCopiedState('none'), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([svgString], { type: 'image/svg+xml' });
    element.href = URL.createObjectURL(file);
    element.download = 'pixel-art-icon.svg';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const newGrid = parseSvgToGrid(text, gridSize);
      setGrid(newGrid);
      alert('SVG imported successfully!');
    } catch (error) {
      alert('Failed to import SVG. Make sure it\'s a valid pixel art SVG file.');
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">Export</h2>

      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="export-type" className="block text-sm font-medium mb-1">
            Export Format
          </label>
          <div className="flex rounded-md overflow-hidden">
            <button
              className={`flex-1 py-2 px-3 text-sm font-medium ${exportType === 'svg'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              onClick={() => setExportType('svg')}
            >
              SVG
            </button>
            <button
              className={`flex-1 py-2 px-3 text-sm font-medium ${exportType === 'jsx'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              onClick={() => setExportType('jsx')}
            >
              JSX
            </button>
            <button
              className={`flex-1 py-2 px-3 text-sm font-medium ${exportType === 'tsx'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              onClick={() => setExportType('tsx')}
            >
              TSX
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="stroke-width" className="block text-sm font-medium mb-1">
            Stroke Width
          </label>
          <input
            type="range"
            id="stroke-width"
            min="0"
            max="1"
            step="0.1"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0</span>
            <span>0.5</span>
            <span>1</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Preview
          </label>
          <div className="border p-3 rounded-md bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 flex justify-center">
            <div dangerouslySetInnerHTML={{ __html: svgString }} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {exportType === 'svg' ? 'SVG Code' : `${exportType.toUpperCase()} Code`}
          </label>
          <div className="relative">
            <pre className="p-3 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 text-xs font-mono overflow-x-auto border border-gray-200 dark:border-gray-700 max-h-40">
              {exportType === 'svg' ? svgString : componentCode}
            </pre>
            <button
              onClick={() => handleCopy(exportType)}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={14} />
            </button>
            {copiedState === exportType && (
              <div className="absolute top-2 right-10 bg-black text-white text-xs py-1 px-2 rounded">
                Copied!
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={() => handleCopy(exportType)}
              className="flex-1 flex items-center justify-center py-2 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors gap-2"
            >
              <Copy size={16} />
              Copy {exportType.toUpperCase()}
            </button>

            {exportType === 'svg' && (
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center py-2 px-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors gap-2"
              >
                <Download size={16} />
                Download SVG
              </button>
            )}
          </div>

          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors gap-2"
            >
              <Upload size={16} />
              Import SVG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;