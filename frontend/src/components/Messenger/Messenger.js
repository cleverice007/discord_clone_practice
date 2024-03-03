import React from "react";
import { useSelector } from 'react-redux';
import WelcomeMessage from "./WelcomeMessage";
import MessengerContent from "./MessengerContent";

const Messenger = () => {
  const chosenChatDetails = useSelector((state) => state.chat.chosenChatDetails);

  return (
    <div className="flex-grow bg-[#36393f] mt-[48px] flex">
      {!chosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContent chosenChatDetails={chosenChatDetails} />
      )}
    </div>
  );
};

export default Messenger;
