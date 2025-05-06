
import React from 'react';
import { X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  content: string;
  time: string;
  read: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
      <div className="relative w-full max-w-sm bg-white shadow-lg rounded-lg mt-16 mr-4 max-h-[80vh] overflow-auto animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Notifications</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="divide-y">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 ${notification.read ? 'opacity-70' : 'border-l-4 border-eon-blue'}`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-3 text-center border-t">
            <button className="text-sm text-eon-blue hover:underline">
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
