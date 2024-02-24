import React from "react";
import FriendsListItem from "./FriendsListItem";
import { useSelector } from "react-redux";

const FriendsList = () => {
  const { friends, onlineUsers } = useSelector((state) => state.friends);

  const checkOnlineUsers = (friends, onlineUsers) => {
    return friends.map((f) => {
      const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
      return { ...f, isOnline: !!isUserOnline };
    });
  };

  const friendsWithOnlineStatus = checkOnlineUsers(friends, onlineUsers);

  return (
    <div className="flex-grow w-full">
      {friendsWithOnlineStatus.map((friend) => (
        <FriendsListItem
          key={friend.id}
          id={friend.id}
          username={friend.username}
          isOnline={friend.isOnline}
        />
      ))}
    </div>
  );
};

export default FriendsList;
