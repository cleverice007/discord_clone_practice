import React from "react";
import Avatar from '../../Avatar';
import OnlineIndicator from "./OnlineIndicator";
import { useDispatch } from "react-redux";
import { setChosenChatDetails, chatTypes } from '../../../slices/chatSlice';


const FriendsListItem = ({ id, username, isOnline }) => {
  const dispatch = useDispatch();

  const handleChooseActiveConversation = () => {
    const payload = {
      chatDetails: { id, name: username },
      chatType: chatTypes.DIRECT, 
    };

    dispatch(setChosenChatDetails(payload));
  };

  return (
    <button
      onClick={handleChooseActiveConversation}
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
