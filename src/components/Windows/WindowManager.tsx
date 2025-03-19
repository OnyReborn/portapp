import React from 'react';
import { useDesktop } from '../../context/DesktopContext';
import Window from './Window';
import Terminal from './Terminal';
import Browser from './Browser';
import FileExplorer from './FileExplorer';

const WindowManager: React.FC = () => {
  const { state } = useDesktop();

  // Render content based on window type
  const renderWindowContent = (window: any) => {
    switch (window.type) {
      case 'terminal':
        return <Terminal />;
      case 'browser':
        return <Browser initialUrl={window.content} />;
      case 'fileExplorer':
        return <FileExplorer initialContent={window.content} />;
      default:
        return <div className="p-4">Unknown window type</div>;
    }
  };

  return (
    <>
      {state.windows.map((window) => (
        <Window key={window.id} window={window}>
          {renderWindowContent(window)}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;
