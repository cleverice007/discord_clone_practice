import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout  } from "../../slices/authSlice"; 
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuToggle = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            // dispatch the logout action
            dispatch(logout());
            localStorage.removeItem('userDetails');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (
      <div className="relative">
        <button
          onClick={handleMenuToggle}
          className="p-2 text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <span className="text-xs font-semibold">Menu</span>
        </button>
        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
    };

export default DropdownMenu;

