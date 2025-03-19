import React, { useState } from 'react';
import { ArrowPathIcon, ArrowLeftIcon, ArrowRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BrowserProps {
  initialUrl?: string;
}

const Browser: React.FC<BrowserProps> = ({ initialUrl = 'https://github.com' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(url);
  };

  const navigateTo = (newUrl: string) => {
    setIsLoading(true);

    // Add http:// if missing
    if (!/^https?:\/\//i.test(newUrl)) {
      newUrl = 'https://' + newUrl;
    }

    // Update url
    setUrl(newUrl);

    // Add to history and update index
    const newHistory = history.slice(0, historyIndex + 1); // Remove forward history
    newHistory.push(newUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(history[historyIndex + 1]);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const goHome = () => {
    navigateTo('https://github.com');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="browser-toolbar flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <ArrowRightIcon className="w-4 h-4" />
        </button>
        <button
          onClick={refresh}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ArrowPathIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={goHome}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <HomeIcon className="w-4 h-4" />
        </button>
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="w-full px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm"
          />
        </form>
      </div>
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <ArrowPathIcon className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <iframe
            src={url}
            title="Browser Frame"
            className="w-full h-full border-none"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        )}
      </div>
    </div>
  );
};

export default Browser;
