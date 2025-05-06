
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChartBar, ClipboardCheck, Database, CreditCard, Settings, Archive, ArrowLeft, ArrowRight } from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen
}) => {
  const location = useLocation();
  const menuItems = [{
    name: 'Dashboard',
    module: 'Analytics',
    icon: <ChartBar className="w-5 h-5" />,
    path: '/dashboard'
  }, {
    name: 'Agents',
    module: 'Management',
    icon: <ClipboardCheck className="w-5 h-5" />,
    path: '/agents'
  }, {
    name: 'Commission',
    module: 'Finance',
    icon: <CreditCard className="w-5 h-5" />,
    path: '/commission'
  }, {
    name: 'Reports',
    module: 'Analytics',
    icon: <Database className="w-5 h-5" />,
    path: '/reports'
  }, {
    name: 'Applications',
    module: 'Management',
    icon: <Archive className="w-5 h-5" />,
    path: '/applications'
  }, {
    name: 'Settings',
    module: 'System',
    icon: <Settings className="w-5 h-5" />,
    path: '/settings'
  }];
  
  return (
    <div className={`h-screen fixed lg:sticky top-0 left-0 z-40 flex flex-shrink-0 bg-[#00205C] border-r border-[#00205C]/70 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 lg:w-20'} overflow-hidden`}>
      <div className="flex flex-col h-full w-full overflow-hidden">
        {/* Logo Section */}
        <div className={`flex items-center justify-between p-4 ${!isOpen && 'lg:justify-center'}`}>
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-white p-1 rounded-md">
              <img alt="EON Logo" className="h-8 w-auto" src="/lovable-uploads/e7ba781b-814c-45c4-ab77-55d41f36857c.png" />
            </div>
            {isOpen && <span className="font-bold text-xl text-white">Admin</span>}
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white lg:block hidden"
          >
            {isOpen ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
          </button>
          {!isOpen && (
            <button onClick={() => setIsOpen(true)} className="text-white lg:hidden">
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
          {isOpen && (
            <button onClick={() => setIsOpen(false)} className="text-white lg:hidden">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-4 py-3 text-white hover:bg-[#00205C]/70 transition-colors ${location.pathname === item.path ? 'bg-[#00205C]/70 font-medium' : ''} ${!isOpen && 'lg:justify-center'}`}
                >
                  <span>{item.icon}</span>
                  {isOpen && (
                    <div className="ml-3">
                      <div className="text-sm">{item.name}</div>
                      <div className="text-xs text-gray-300">{item.module}</div>
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile */}
        <div className={`border-t border-[#00205C]/70 p-4 ${!isOpen && 'lg:flex lg:justify-center'}`}>
          <div className="flex items-center space-x-3">
            <div className="bg-[#E5241B] text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="font-medium">AD</span>
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Admin User</span>
                <span className="text-xs text-gray-300">admin@eon.com</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
