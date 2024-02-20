import React from "react";
import { UserGroupIcon } from '@heroicons/react/solid';

const MainPageButton = () => {
  return (
    <button className="w-12 h-12 rounded-lg m-0 p-0 mt-2.5 bg-blue-600 flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">
      <UserGroupIcon className="w-6 h-6 text-white" />
    </button>
  );
};

export default MainPageButton;
