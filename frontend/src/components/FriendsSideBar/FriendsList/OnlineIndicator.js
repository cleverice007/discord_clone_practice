import React from "react";

const OnlineIndicator = () => {
  return (
    <div className="flex items-center absolute right-1.25 text-green-500">
      <span className="block w-2.5 h-2.5 bg-green-500 rounded-full"></span>
    </div>
  );
};

export default OnlineIndicator;
