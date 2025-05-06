
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen w-full bg-eon-light-gray flex overflow-hidden">
      <div className="flex-shrink-0">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
