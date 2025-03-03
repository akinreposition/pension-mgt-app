// src/components/Notification/NotificationCenter.tsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: string;
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState<boolean>(true);

  // Add a new notification and show a toast
  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      read: false,
      timestamp: new Date().toLocaleString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
    toast.info(message);
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      addNotification('Contribution status updated to approved.');
    }, 15000); // every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-2 bg-white rounded shadow">
      {/* Email Notification Preference */}
      <div className="mb-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={emailNotificationsEnabled}
            onChange={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}
            className="form-checkbox h-5 w-5"
          />
          <span className="text-sm">Email Notifications Enabled</span>
        </label>
      </div>

      <button
        onClick={markAllAsRead}
        className="mb-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm"
      >
        Mark All as Read
      </button>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No notifications available.</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-2 border rounded text-sm ${
                notification.read ? 'bg-gray-100' : 'bg-blue-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <p>{notification.message}</p>
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-blue-600 hover:underline"
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
