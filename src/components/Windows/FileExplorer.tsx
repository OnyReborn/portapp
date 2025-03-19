import React from 'react';
import { FileItem } from '../../types';
import { useDesktop } from '../../context/DesktopContext';
import { DocumentTextIcon, FolderIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';

interface FileExplorerProps {
  initialContent?: FileItem | string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ initialContent }) => {
  const { openFile } = useDesktop();

  // Check if content is a folder (FileItem) or text content
  const isFolder = typeof initialContent !== 'string' && initialContent?.type === 'folder';
  const isText = typeof initialContent === 'string';

  const renderFileIcon = (file: FileItem) => {
    switch (file.type) {
      case 'folder':
        return <FolderIcon className="w-5 h-5 text-blue-400" />;
      case 'text':
        return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
      default:
        return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleFileClick = (file: FileItem) => {
    openFile(file);
  };

  // Render folder content with files and folders
  const renderFolderContent = () => {
    if (!initialContent || typeof initialContent === 'string') {
      return <div className="p-4">No files found</div>;
    }

    const folder = initialContent as FileItem;

    if (!folder.children || folder.children.length === 0) {
      return <div className="p-4">This folder is empty</div>;
    }

    return (
      <div className="p-2">
        <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 mb-2">
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50">
            <ChevronRightIcon className="w-4 h-4" />
          </button>
          <div className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm flex-1">
            {folder.name}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {folder.children.map((file) => (
            <div
              key={file.id}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex flex-col items-center"
              onClick={() => handleFileClick(file)}
            >
              {renderFileIcon(file)}
              <span className="text-xs mt-1 text-center truncate w-full">{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render text file content with markdown support
  const renderTextContent = () => {
    if (typeof initialContent !== 'string') {
      return <div className="p-4">No content to display</div>;
    }

    return (
      <div className="p-4 prose prose-sm dark:prose-invert max-w-none overflow-auto">
        <ReactMarkdown>{initialContent}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 text-black dark:text-white overflow-auto">
      {isFolder ? renderFolderContent() : renderTextContent()}
    </div>
  );
};

export default FileExplorer;
