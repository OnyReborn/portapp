import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { WindowState, PositionType, SizeType } from '../../types';
import { useDesktop } from '../../context/DesktopContext';
import { XMarkIcon, MinusIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ window, children }) => {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    moveWindow,
    resizeWindow
  } = useDesktop();

  const nodeRef = useRef<HTMLDivElement>(null);
  const [resizing, setResizing] = useState(false);
  const [resizeStartPosition, setResizeStartPosition] = useState<PositionType>({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState<SizeType>({ width: 0, height: 0 });

  // When window is clicked, focus it
  const handleWindowClick = () => {
    if (!window.isActive) {
      focusWindow(window.id);
    }
  };

  // Handle window dragging
  const handleDrag = (_e: any, data: { x: number; y: number }) => {
    if (!window.isMaximized) {
      moveWindow(window.id, { x: data.x, y: data.y });
    }
  };

  // Initialize resize
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setResizing(true);
    setResizeStartPosition({ x: e.clientX, y: e.clientY });
    setInitialSize({ width: window.size.width, height: window.size.height });

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  // Handle resize movement
  const handleResizeMove = (e: MouseEvent) => {
    if (resizing) {
      const deltaX = e.clientX - resizeStartPosition.x;
      const deltaY = e.clientY - resizeStartPosition.y;

      const newWidth = Math.max(300, initialSize.width + deltaX); // Minimum width
      const newHeight = Math.max(200, initialSize.height + deltaY); // Minimum height

      resizeWindow(window.id, { width: newWidth, height: newHeight });
    }
  };

  // End resize operation
  const handleResizeEnd = () => {
    setResizing(false);
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [resizing]);

  // If window is minimized, don't render it
  if (window.isMinimized) {
    return null;
  }

  const windowStyle: React.CSSProperties = {
    width: window.isMaximized ? '100%' : `${window.size.width}px`,
    height: window.isMaximized ? 'calc(100% - 28px)' : `${window.size.height}px`,
    zIndex: window.zIndex,
    position: 'absolute',
    top: window.isMaximized ? '28px' : undefined,
    left: window.isMaximized ? '0' : undefined,
    borderRadius: window.isMaximized ? '0' : '8px',
    overflow: 'hidden',
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      position={window.isMaximized ? { x: 0, y: 28 } : window.position}
      onDrag={handleDrag}
      disabled={window.isMaximized}
    >
      <div
        ref={nodeRef}
        className={`window ${window.isActive ? 'ring-2 ring-blue-400' : ''}`}
        style={windowStyle}
        onClick={handleWindowClick}
      >
        <div className="window-header border-b border-mac-border dark:border-mac-border-dark">
          <div className="flex space-x-2">
            <button
              className="mac-btn mac-close hover:opacity-80"
              onClick={() => closeWindow(window.id)}
            >
              <XMarkIcon className="h-2 w-2 text-black/0 hover:text-black/80 opacity-0 hover:opacity-100" />
            </button>
            <button
              className="mac-btn mac-minimize hover:opacity-80"
              onClick={() => minimizeWindow(window.id)}
            >
              <MinusIcon className="h-2 w-2 text-black/0 hover:text-black/80 opacity-0 hover:opacity-100" />
            </button>
            <button
              className="mac-btn mac-maximize hover:opacity-80"
              onClick={() => window.isMaximized ? restoreWindow(window.id) : maximizeWindow(window.id)}
            >
              <ArrowsPointingOutIcon className="h-2 w-2 text-black/0 hover:text-black/80 opacity-0 hover:opacity-100" />
            </button>
          </div>
          <div className="text-center text-sm font-medium absolute left-0 right-0 mx-auto pointer-events-none">
            {window.title}
          </div>
          <div></div> {/* Empty div for flex spacing */}
        </div>

        <div className="window-content overflow-auto h-[calc(100%-30px)]">
          {children}
        </div>

        {!window.isMaximized && (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={handleResizeStart}
          />
        )}
      </div>
    </Draggable>
  );
};

export default Window;
