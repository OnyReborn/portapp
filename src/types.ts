export type WindowType = 'terminal' | 'browser' | 'fileExplorer';

export interface PositionType {
  x: number;
  y: number;
}

export interface SizeType {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  type: WindowType;
  title: string;
  position: PositionType;
  size: SizeType;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  content?: any;
}

export type FileType = 'folder' | 'text' | 'image';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  content?: string;
  children?: FileItem[];
  position?: PositionType;
  isSelected?: boolean;
}

export interface DesktopState {
  windows: WindowState[];
  activeWindowId: string | null;
  files: FileItem[];
  isDarkMode: boolean;
}
