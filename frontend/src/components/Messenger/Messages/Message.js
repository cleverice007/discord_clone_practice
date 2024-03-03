import React from "react";
import Avatar from "../../../shared/components/Avatar";

const Message = ({ content, sameAuthor, username, date, sameDay }) => {
  if (sameAuthor && sameDay) {
    return (
      <div className="text-[#DCDDDE] w-full">
        <span className="ml-[70px]">{content}</span>
      </div>
    );
  }

  return (
    <div className="w-full flex mt-[10px]">
      <div className="w-[70px]">
        <Avatar username={username} />
      </div>
      <div className="flex flex-col ml-[10px]">
        <div className="text-white text-lg">
          {username} <span className="text-xs text-[#72767d]">{date}</span>
        </div>
        <div className="text-[#DCDDDE]">{content}</div>
      </div>
    </div>
  );
};

export default Message;
