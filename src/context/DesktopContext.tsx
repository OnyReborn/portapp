import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import {
  DesktopState,
  WindowState,
  WindowType,
  FileItem,
  PositionType,
  SizeType
} from '../types';
import fileSystem from '../data/filesystem';

// Actions
type Action =
  | { type: 'OPEN_WINDOW'; payload: { windowType: WindowType; title: string; size: SizeType; content?: any } }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'MAXIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'RESTORE_WINDOW'; payload: { id: string } }
  | { type: 'FOCUS_WINDOW'; payload: { id: string } }
  | { type: 'MOVE_WINDOW'; payload: { id: string; position: PositionType } }
  | { type: 'RESIZE_WINDOW'; payload: { id: string; size: SizeType } }
  | { type: 'OPEN_FILE'; payload: { file: FileItem } }
  | { type: 'SELECT_FILE'; payload: { id: string } }
  | { type: 'TOGGLE_DARK_MODE' };

// Initial State
const initialState: DesktopState = {
  windows: [],
  activeWindowId: null,
  files: fileSystem,
  isDarkMode: false,
};

// Reducer
const desktopReducer = (state: DesktopState, action: Action): DesktopState => {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const { windowType, title, size, content } = action.payload;
      const newWindow: WindowState = {
        id: uuid(),
        type: windowType,
        title,
        position: { x: 100, y: 100 },
        size,
        isActive: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: state.windows.length + 1,
        content,
      };

      // Adjust position for each new window to create a cascading effect
      if (state.windows.length > 0) {
        newWindow.position = {
          x: 100 + ((state.windows.length % 5) * 30),
          y: 100 + ((state.windows.length % 5) * 30),
        };
      }

      return {
        ...state,
        windows: [
          ...state.windows.map(w => ({ ...w, isActive: false })),
          newWindow,
        ],
        activeWindowId: newWindow.id,
      };
    }

    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter(window => window.id !== action.payload.id),
        activeWindowId: state.windows.length > 1
          ? (state.activeWindowId === action.payload.id
            ? state.windows.find(w => w.id !== action.payload.id)?.id || null
            : state.activeWindowId)
          : null,
      };

    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload.id
            ? { ...window, isMinimized: true, isActive: false }
            : window
        ),
        activeWindowId: state.activeWindowId === action.payload.id
          ? null
          : state.activeWindowId,
      };

    case 'MAXIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload.id
            ? { ...window, isMaximized: true, isActive: true }
            : { ...window, isActive: false }
        ),
        activeWindowId: action.payload.id,
      };

    case 'RESTORE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload.id
            ? { ...window, isMinimized: false, isMaximized: false, isActive: true }
            : { ...window, isActive: false }
        ),
        activeWindowId: action.payload.id,
      };

    case 'FOCUS_WINDOW': {
      // Find the highest zIndex
      const highestZIndex = Math.max(...state.windows.map(w => w.zIndex), 0);

      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload.id
            ? { ...window, isActive: true, zIndex: highestZIndex + 1 }
            : { ...window, isActive: false }
        ),
        activeWindowId: action.payload.id,
      };
    }

    case 'MOVE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload.id
            ? { ...window, position: action.payload.position }
            : window
        ),
      };

    case 'RESIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload.id
            ? { ...window, size: action.payload.size }
            : window
        ),
      };

    case 'OPEN_FILE': {
      const { file } = action.payload;

      if (file.type === 'text') {
        // Open text file in a window
        const newWindow: WindowState = {
          id: uuid(),
          type: 'fileExplorer',
          title: file.name,
          position: { x: 100, y: 100 },
          size: { width: 600, height: 400 },
          isActive: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: state.windows.length + 1,
          content: file.content,
        };

        // Adjust position for cascade effect
        if (state.windows.length > 0) {
          newWindow.position = {
            x: 100 + ((state.windows.length % 5) * 30),
            y: 100 + ((state.windows.length % 5) * 30),
          };
        }

        return {
          ...state,
          windows: [
            ...state.windows.map(w => ({ ...w, isActive: false })),
            newWindow,
          ],
          activeWindowId: newWindow.id,
        };
      } else if (file.type === 'folder') {
        // Open folder in file explorer
        const newWindow: WindowState = {
          id: uuid(),
          type: 'fileExplorer',
          title: file.name,
          position: { x: 100, y: 100 },
          size: { width: 600, height: 400 },
          isActive: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: state.windows.length + 1,
          content: file,
        };

        // Adjust position for cascade effect
        if (state.windows.length > 0) {
          newWindow.position = {
            x: 100 + ((state.windows.length % 5) * 30),
            y: 100 + ((state.windows.length % 5) * 30),
          };
        }

        return {
          ...state,
          windows: [
            ...state.windows.map(w => ({ ...w, isActive: false })),
            newWindow,
          ],
          activeWindowId: newWindow.id,
        };
      }
      return state;
    }

    case 'SELECT_FILE':
      return {
        ...state,
        files: state.files.map(file => {
          if (file.id === action.payload.id) {
            return { ...file, isSelected: true };
          }

          // Recursively update children if this is a folder
          if (file.type === 'folder' && file.children) {
            return {
              ...file,
              isSelected: false,
              children: file.children.map(child =>
                child.id === action.payload.id
                  ? { ...child, isSelected: true }
                  : { ...child, isSelected: false }
              )
            };
          }

          return { ...file, isSelected: false };
        }),
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };

    default:
      return state;
  }
};

// Context
interface DesktopContextType {
  state: DesktopState;
  openWindow: (windowType: WindowType, title: string, size: SizeType, content?: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, position: PositionType) => void;
  resizeWindow: (id: string, size: SizeType) => void;
  openFile: (file: FileItem) => void;
  selectFile: (id: string) => void;
  toggleDarkMode: () => void;
}

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

// Provider Component
export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(desktopReducer, initialState);

  // Apply dark mode to the document
  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  const openWindow = (windowType: WindowType, title: string, size: SizeType, content?: any) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { windowType, title, size, content } });
  };

  const closeWindow = (id: string) => {
    dispatch({ type: 'CLOSE_WINDOW', payload: { id } });
  };

  const minimizeWindow = (id: string) => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } });
  };

  const maximizeWindow = (id: string) => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: { id } });
  };

  const restoreWindow = (id: string) => {
    dispatch({ type: 'RESTORE_WINDOW', payload: { id } });
  };

  const focusWindow = (id: string) => {
    dispatch({ type: 'FOCUS_WINDOW', payload: { id } });
  };

  const moveWindow = (id: string, position: PositionType) => {
    dispatch({ type: 'MOVE_WINDOW', payload: { id, position } });
  };

  const resizeWindow = (id: string, size: SizeType) => {
    dispatch({ type: 'RESIZE_WINDOW', payload: { id, size } });
  };

  const openFile = (file: FileItem) => {
    dispatch({ type: 'OPEN_FILE', payload: { file } });
  };

  const selectFile = (id: string) => {
    dispatch({ type: 'SELECT_FILE', payload: { id } });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <DesktopContext.Provider
      value={{
        state,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        focusWindow,
        moveWindow,
        resizeWindow,
        openFile,
        selectFile,
        toggleDarkMode,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
};

// Custom hook for using the Desktop context
export const useDesktop = (): DesktopContextType => {
  const context = useContext(DesktopContext);
  if (context === undefined) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
};
