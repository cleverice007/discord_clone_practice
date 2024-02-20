import React from "react";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";


const FriendsSideBar = () => {
  return (
    <div className="w-56 h-full flex flex-col items-center bg-gray-800">
      <AddFriendButton />
      <FriendsTitle title="Private Messages" />
    </div>
  );
};

export default FriendsSideBar;
