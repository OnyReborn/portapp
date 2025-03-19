import React from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { DocumentTextIcon, FolderIcon } from '@heroicons/react/24/outline';
import { FileItem } from '../../types';

const Desktop: React.FC = () => {
  const { state, openFile, selectFile } = useDesktop();

  const handleFileClick = (file: FileItem) => {
    selectFile(file.id);
  };

  const handleFileDoubleClick = (file: FileItem) => {
    openFile(file);
  };

  // Helper function to render file icon based on type
  const renderFileIcon = (file: FileItem) => {
    switch (file.type) {
      case 'folder':
        return <FolderIcon className="w-10 h-10 text-blue-400" />;
      case 'text':
        return <DocumentTextIcon className="w-10 h-10 text-white" />;
      default:
        return <DocumentTextIcon className="w-10 h-10 text-white" />;
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-gradient-to-br from-mac-desktop-blue to-mac-desktop-purple dark:from-gray-900 dark:to-gray-800"
      style={{ paddingTop: '28px' }} // Space for menu bar
    >
      <div className="relative w-full h-full">
        {state.files.map((file) => (
          <div
            key={file.id}
            className={`desktop-icon absolute ${file.isSelected ? 'bg-white/20' : ''}`}
            style={{
              left: `${file.position?.x || 20}px`,
              top: `${file.position?.y || 20}px`,
            }}
            onClick={() => handleFileClick(file)}
            onDoubleClick={() => handleFileDoubleClick(file)}
          >
            {renderFileIcon(file)}
            <span className="desktop-icon-text">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Desktop;
