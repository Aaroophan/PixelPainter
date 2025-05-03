import EditorLayout from './components/EditorLayout';
import { PixelArtProvider } from './context/PixelArtContext';
import { ToolProvider } from './context/ToolContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <PixelArtProvider>
        <ToolProvider>
          <EditorLayout />
        </ToolProvider>
      </PixelArtProvider>
    </ThemeProvider>
  );
}

export default App;