import React from "react";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";
import DateSeparator from "./DateSeparator";
import { useSelector } from "react-redux";

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyyy/gi, (matched) => map[matched]);
};

const Messages = () => {
  const chosenChatDetails = useSelector((state) => state.chat.chosenChatDetails);
  const messages = useSelector((state) => state.chat.messages); 
  return (
    <div className="h-[calc(100%-60px)] overflow-auto flex flex-col items-center">
      <MessagesHeader name={chosenChatDetails?.name} />
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && messages[index].author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
          convertDateToHumanReadable(new Date(messages[index - 1].date), "dd/mm/yy");

        return (
          <div key={message._id} className="w-97%">
            {(!sameDay || index === 0) && (
              <DateSeparator
                date={convertDateToHumanReadable(new Date(message.date), "dd/mm/yy")}
              />
            )}
            <Message
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              date={convertDateToHumanReadable(new Date(message.date), "dd/mm/yy")}
              sameDay={sameDay}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
