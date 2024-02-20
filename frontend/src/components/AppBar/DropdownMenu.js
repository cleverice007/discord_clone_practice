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
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={handleMenuToggle}
                    className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                >
                    <span className="sr-only">Options</span>
                </button>
            </div>
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <button
                            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;

