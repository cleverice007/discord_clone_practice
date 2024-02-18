import React from "react";

const AuthBox = ({ children }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-indigo-600">
      <div className="w-[700px] h-[400px] bg-gray-800 rounded-lg shadow-lg flex flex-col p-6">
        {children}
      </div>
    </div>
  );
};

export default AuthBox;
