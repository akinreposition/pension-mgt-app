import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationCenter from '../notification/NotificationCenter';

// Simple SVG for the bell icon (you can replace with your own or FontAwesome)
const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 17.25a2.25 2.25 0 01-4.5 0m4.5 0h4.5a2.25
         2.25 0 002.25-2.25V11.5a7.5 7.5 0 00-6-7.32V3a1.5 1.5 0
         00-3 0v1.18a7.5 7.5 0 00-6 7.32v3.5a2.25 2.25 0
         002.25 2.25h4.5m4.5 0a2.251 2.251 0
         01-2.25 2.25h-0.75"
    />
  </svg>
);

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-white shadow px-4 py-2 flex items-center justify-between">
      {/* Brand or Logo */}
      <div className="text-xl font-bold">PensionApp</div>

      {/* Right Section: Notification + Avatar */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <BellIcon />
          </button>

          {/* Dropdown with Notifications */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg p-2 z-50">
              <NotificationCenter />
            </div>
          )}
        </div>

        {/* Avatar Image */}
        <img
          src="https://www.pexels.com/photo/grayscale-photography-of-man-wearing-coat-25733/"
          alt="User Avatar"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => navigate('/profile')}
        />
      </div>
    </nav>
  );
};

export default Navbar;
