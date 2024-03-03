import React from "react";
import { useSelector } from "react-redux";

const ChosenOptionLabel = () => {
  const name = useSelector(state => state.chat.chosenChatDetails?.name);

  return (
    <div className="text-white font-bold text-base">
      {name ? `Chosen conversation: ${name}` : ""}
    </div>
  );
};

export default ChosenOptionLabel;
