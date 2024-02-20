import React from "react";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./FriendsList/FriendsList";


const FriendsSideBar = () => {
  return (
    <div className="w-56 h-full flex flex-col items-center bg-gray-800">
      <AddFriendButton />
      <FriendsTitle title="Private Messages" />
      <FriendsList />
    </div>
  );
};

export default FriendsSideBar;
