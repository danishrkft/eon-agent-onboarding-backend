
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChartBar, 
  ClipboardCheck, 
  Database,
  CreditCard, 
  Settings, 
  Archive,
  ArrowLeft
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <ChartBar className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Agents', icon: <ClipboardCheck className="w-5 h-5" />, path: '/agents' },
    { name: 'Commission', icon: <CreditCard className="w-5 h-5" />, path: '/commission' },
    { name: 'Reports', icon: <Database className="w-5 h-5" />, path: '/reports' },
    { name: 'Applications', icon: <Archive className="w-5 h-5" />, path: '/applications' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
  ];

  return (
    <div 
      className={`fixed lg:static inset-0 z-40 flex-shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 lg:w-20'
      }`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo Section */}
        <div className={`flex items-center justify-between p-4 ${!isOpen && 'lg:justify-center'}`}>
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-eon-blue rounded-md w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-xl">EON</span>
            </div>
            {isOpen && <span className="font-bold text-xl text-eon-dark-blue">Admin</span>}
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 lg:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-700 hover:bg-eon-light-blue hover:text-eon-blue transition-colors ${
                    location.pathname === item.path ? 'bg-eon-light-blue text-eon-blue font-medium' : ''
                  } ${!isOpen && 'lg:justify-center'}`}
                >
                  <span>{item.icon}</span>
                  {isOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile */}
        <div className={`border-t border-gray-200 p-4 ${!isOpen && 'lg:flex lg:justify-center'}`}>
          <div className="flex items-center space-x-3">
            <div className="bg-eon-light-blue rounded-full w-10 h-10 flex items-center justify-center">
              <span className="font-medium text-eon-blue">AD</span>
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-gray-500">admin@eon.com</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
