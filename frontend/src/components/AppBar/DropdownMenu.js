import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout  } from "../../slices/authSlice"; 

const DropdownMenu = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuToggle = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            // dispatch the logout action
            dispatch(logout());
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="relative">
          <button
            onClick={handleMenuToggle}
            className="p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 10a2 2 0 110-4 2 2 0 010 4zm0 2a2 2 0 100 4 2 2 0 000-4zm8-2a2 2 0 110-4 2 2 0 010 4zm0 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      );
    };

export default DropdownMenu;

