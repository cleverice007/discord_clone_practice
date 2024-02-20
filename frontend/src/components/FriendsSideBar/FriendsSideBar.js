import React from "react";
import AddFriendButton from "./AddFriendButton";


const FriendsSideBar = () => {
  return (
    <div className="w-56 h-full flex flex-col items-center bg-gray-800">
      <AddFriendButton />
    </div>
  );
};

export default FriendsSideBar;
