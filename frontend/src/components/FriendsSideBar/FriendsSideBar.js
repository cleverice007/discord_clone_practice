import React from "react";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./FriendsList/FriendsList";
import PendingInvitationsList from './PendingInvitationsList/PendingInvitationList';



const FriendsSideBar = () => {
  return (
    <div className="w-56 h-full flex flex-col items-center bg-gray-800">
      <AddFriendButton />
      <FriendsTitle title="Private Messages" />
      <FriendsList />
      <PendingInvitationsList />
    </div>
  );
};

export default FriendsSideBar;
