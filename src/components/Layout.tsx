
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from './ThemeProvider';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen w-full bg-eon-light-gray dark:bg-gray-900 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
