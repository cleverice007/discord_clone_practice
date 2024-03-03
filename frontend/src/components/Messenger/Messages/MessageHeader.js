import React from "react";
import Avatar from "../../../shared/components/Avatar";

const MessagesHeader = ({ name = "" }) => {
  return (
    <div className="w-98% flex flex-col mt-2.5">
      <Avatar large username={name} />
      <h4 className="font-bold text-white ml-1 mr-1">
        {name}
      </h4>
      <span className="text-[#b9bbbe] ml-1 mr-1">
        This is the beginning of your conversation with {name}
      </span>
    </div>
  );
};

export default MessagesHeader;
