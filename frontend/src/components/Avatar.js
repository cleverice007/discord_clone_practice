import React from "react";

const Avatar = ({ username, large }) => {
  const sizeClass = large ? "h-20 w-20 text-4xl" : "h-10 w-10 text-xl"; 

  return (
    <div className={`flex items-center justify-center bg-blue-600 rounded-full font-bold text-white ml-1 ${sizeClass}`}>
      {username.substring(0, 2).toUpperCase()}
    </div>
  );
};

export default Avatar;
