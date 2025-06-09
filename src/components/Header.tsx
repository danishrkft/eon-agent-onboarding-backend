
import React, { useState } from 'react';
import { Bell, Menu, X, User, Settings, LogOut, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationModal from './NotificationModal';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // Sample notifications data
  const notifications = [
    {
      id: '1',
      title: 'New Agent Application',
      content: 'Ahmad Faizal has submitted a new agent application',
      time: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Commission Payout Complete',
      content: 'Monthly commission payout has been processed',
      time: '1 hour ago',
      read: true
    },
    {
      id: '3',
      title: 'Report Generated',
      content: 'Sales report for April 2025 is ready for download',
      time: '3 hours ago',
      read: false
    }
  ];

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between px-4 h-16 sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={() => setNotificationModalOpen(true)}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <div className="bg-[#00205C] text-white h-9 w-9 rounded-full flex items-center justify-center">
                AF
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowEditProfileModal(true)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <NotificationModal 
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        notifications={notifications}
      />

      {showEditProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowEditProfileModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-[#00205C] text-white flex items-center justify-center text-2xl">
                    AF
                  </div>
                  <Button variant="outline" size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue="Ahmad Faizal" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" className="w-full mt-1 p-2 border rounded-md" defaultValue="ahmad.faizal@eon.my" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <input type="tel" className="w-full mt-1 p-2 border rounded-md" defaultValue="+60123456789" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Position</label>
                  <input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue="Senior Manager" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue="Sales" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setShowEditProfileModal(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#00205C]" onClick={() => setShowEditProfileModal(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
