import React from "react";
import FriendsListItem from "./FriendsListItem";

const DUMMY_FRIENDS = [
  {
    id: 1,
    username: "Mark",
    isOnline: true,
  },
  {
    id: 2,
    username: "Anna",
    isOnline: false,
  },
  {
    id: 3,
    username: "John",
    isOnline: false,
  },
];

const FriendsList = () => {
  return (
    <div className="flex-grow w-full">
      {DUMMY_FRIENDS.map((friend) => (
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
