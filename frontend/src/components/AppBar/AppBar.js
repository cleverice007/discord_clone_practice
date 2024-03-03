import React from "react";
import DropdownMenu from './DropdownMenu';
import ChosenOptionLabel from "./ChosenOptionLabel";

const AppBar = () => {
  return (
    <div className="absolute right-0 top-0 h-12 border-b border-black bg-gray-900 w-[calc(100%-270px)] flex items-center justify-between px-4">
      <ChosenOptionLabel />
      <DropdownMenu />
    </div>
  );
};

export default AppBar;
