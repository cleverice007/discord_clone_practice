import React from "react";
import DropdownMenu from "./DropdownMenu";

const AppBar = () => {
  return (
    <div className="absolute right-0 top-0 h-12 border-b border-black bg-gray-900 w-[calc(100%-326px)] flex items-center justify-between px-4">
      <DropdownMenu />
    </div>
  );
};

export default AppBar;
