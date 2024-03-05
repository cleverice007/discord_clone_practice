import React, { useEffect } from "react";
import NewMessageInput from "./NewMessageInput";
import Messages from "./Messages/Messages";
import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection";

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <div className="flex-grow">
      <Messages />
      <NewMessageInput />
    </div>
  );
};

export default MessengerContent;
