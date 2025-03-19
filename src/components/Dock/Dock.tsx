import React from 'react';
import { useDesktop } from '../../context/DesktopContext';
import {
  ComputerDesktopIcon,
  CommandLineIcon,
  FolderIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const Dock: React.FC = () => {
  const { openWindow } = useDesktop();

  const dockItems = [
    {
      id: 'fileExplorer',
      name: 'Files',
      icon: <FolderIcon className="w-8 h-8" />,
      onClick: () => openWindow('fileExplorer', 'File Explorer', { width: 600, height: 400 }),
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: <CommandLineIcon className="w-8 h-8" />,
      onClick: () => openWindow('terminal', 'Terminal', { width: 600, height: 400 }),
    },
    {
      id: 'browser',
      name: 'Browser',
      icon: <GlobeAltIcon className="w-8 h-8" />,
      onClick: () =>
        openWindow('browser', 'Browser', { width: 800, height: 600 }, 'https://github.com'),
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-end gap-2 px-4 py-2 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-lg">
      {dockItems.map((item) => (
        <DockIcon
          key={item.id}
          icon={item.icon}
          name={item.name}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

interface DockIconProps {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ icon, name, onClick }) => {
  return (
    <div className="group flex flex-col items-center">
      <button
        onClick={onClick}
        className="p-2 rounded-xl bg-white/10 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 hover:scale-110 transition-all duration-200 ease-in-out flex items-center justify-center border border-white/30 dark:border-white/10 shadow-md"
      >
        {icon}
      </button>
      <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};

export default Dock;
