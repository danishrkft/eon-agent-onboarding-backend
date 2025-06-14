
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  
  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          isSidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
