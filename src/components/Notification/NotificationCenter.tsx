import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: string;
}

const NotificationCenter: React.FC = () => {
  // State for notifications and email preference
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState<boolean>(true);

  // Add a new notification and show a toast message
  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      read: false,
      timestamp: new Date().toLocaleString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
    toast.info(message);
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  // Simulate real-time updates (e.g., contribution status change notifications)
  useEffect(() => {
    const interval = setInterval(() => {
      addNotification('Contribution status updated to approved.');
    }, 15000); // every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Notification Center</h2>

      {/* Email Notification Preference */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={emailNotificationsEnabled}
            onChange={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}
            className="form-checkbox h-5 w-5"
          />
          <span>Email Notifications Enabled</span>
        </label>
      </div>

      <button
        onClick={markAllAsRead}
        className="mb-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
      >
        Mark All as Read
      </button>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map(notification => (
            <li
              key={notification.id}
              className={`p-2 border rounded ${
                notification.read ? 'bg-gray-100' : 'bg-blue-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm">{notification.message}</p>
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-xs text-blue-600 hover:underline"
                  disabled={notification.read}
                >
                  {notification.read ? 'Read' : 'Mark as Read'}
                </button>
              </div>
              <p className="text-xs text-gray-500">{notification.timestamp}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationCenter;
