import React, { useEffect } from "react";
import NewMessageInput from "./NewMessageInput";
import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection";

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <div className="flex-grow">
      <NewMessageInput />
    </div>
  );
};

export default MessengerContent;
