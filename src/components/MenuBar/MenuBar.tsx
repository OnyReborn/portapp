import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useDesktop } from '../../context/DesktopContext';

const MenuBar: React.FC = () => {
  const { toggleDarkMode, state } = useDesktop();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      // Format time as HH:MM
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);

      // Format date as Day, Month Date
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    // Update immediately, then set interval
    updateClock();
    const interval = setInterval(updateClock, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-mac-menubar-gray dark:bg-mac-menubar-gray-dark backdrop-blur-md z-50 flex items-center justify-between px-4 text-sm text-black dark:text-white shadow-sm">
      <div className="flex items-center space-x-6">
        <div className="font-semibold">
          Portfolio
        </div>
        <div className="hidden sm:flex space-x-4">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          {state.isDarkMode ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </button>
        <div className="flex flex-col items-center text-xs">
          <span>{currentTime}</span>
          <span className="hidden sm:inline">{currentDate}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
