import React, { useState } from 'react';
import { Search, Menu, Bell, User, Settings, LogOut } from 'lucide-react';
import NotificationModal from './NotificationModal';
type HeaderProps = {
  toggleSidebar: () => void;
};
const sampleNotifications = [{
  id: '1',
  title: 'New agent registration',
  content: 'Ahmad bin Abdullah has registered as a new agent.',
  time: '10 min ago',
  read: false
}, {
  id: '2',
  title: 'Commission payout completed',
  content: 'May 2025 commission payout has been processed.',
  time: '1 hour ago',
  read: false
}, {
  id: '3',
  title: 'Agent status updated',
  content: 'Nurul Huda\'s status has been changed to Active.',
  time: '3 hours ago',
  read: true
}, {
  id: '4',
  title: 'System maintenance',
  content: 'System will undergo maintenance on June 10, 2025.',
  time: '1 day ago',
  read: true
}, {
  id: '5',
  title: 'Training module added',
  content: 'New compliance training module has been added.',
  time: '2 days ago',
  read: true
}];
const Header: React.FC<HeaderProps> = ({
  toggleSidebar
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  return <header className="bg-white border-b border-gray-200 shadow-sm w-full">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 text-eon-blue focus:outline-none lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden md:flex items-center bg-eon-light-gray rounded-md px-3 py-2 w-64">
            <Search className="h-4 w-4 text-gray-500" />
            <input type="text" placeholder="Search..." className="bg-transparent border-0 outline-none text-sm ml-2 w-full" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-eon-blue hover:text-eon-red relative" onClick={() => setNotificationsOpen(true)}>
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-eon-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {sampleNotifications.filter(n => !n.read).length}
            </span>
          </button>

          <div className="relative">
            <button className="flex items-center focus:outline-none" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
              <div className="text-white rounded-full w-8 h-8 flex items-center justify-center bg-eon-red">
                <span className="font-medium text-sm">AD</span>
              </div>
            </button>
            
            {profileMenuOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@eon.com</p>
                </div>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign out
                </a>
              </div>}
          </div>
        </div>
      </div>
      
      <NotificationModal isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} notifications={sampleNotifications} />
    </header>;
};
export default Header;