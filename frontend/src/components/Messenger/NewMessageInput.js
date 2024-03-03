import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sendDirectMessage } from "../../realtimeCommunication/socketConnection";

const NewMessageInput = () => {
  const [message, setMessage] = useState("");
  const chosenChatDetails = useSelector((state) => state.chat.chosenChatDetails);

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="h-15 w-full flex items-center justify-center">
      <input
        className="bg-[#2f3136] w-[98%] h-11 text-white border-none rounded-md text-sm p-2.5"
        placeholder={`Write message to ${chosenChatDetails.name}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </div>
  );
};

export default NewMessageInput;
