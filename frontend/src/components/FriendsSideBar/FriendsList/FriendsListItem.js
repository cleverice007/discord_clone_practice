import React from "react";
import Avatar from '../../Avatar';
import OnlineIndicator from "./OnlineIndicator";

const FriendsListItem = ({ id, username, isOnline }) => {
  return (
    <button
      className="w-full h-10 mt-2.5 flex items-center justify-start text-left text-black relative"
    >
      <Avatar username={username} />
      <span className="ml-1.75 font-bold text-gray-400">
        {username}
      </span>
      {isOnline && <OnlineIndicator />}
    </button>
  );
};

export default FriendsListItem;
