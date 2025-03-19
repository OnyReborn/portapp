import React from 'react';
import { DesktopProvider } from './context/DesktopContext';
import Desktop from './components/Desktop/Desktop';
import MenuBar from './components/MenuBar/MenuBar';
import Dock from './components/Dock/Dock';
import WindowManager from './components/Windows/WindowManager';

function App() {
  return (
    <DesktopProvider>
      <div className="relative h-full w-full overflow-hidden">
        <MenuBar />
        <Desktop />
        <WindowManager />
        <Dock />
      </div>
    </DesktopProvider>
  );
}

export default App;
