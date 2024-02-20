import React from "react";
import PendingInvitationsListItem from "./PendingInvitationsListItem";

const DUMMY_INVITATIONS = [
  {
    _id: "1",
    senderId: {
      username: "Mark",
      mail: "dummy@ad.com",
    },
  },
  {
    _id: "2",
    senderId: {
      username: "John",
      mail: "John@ad.com",
    },
  },
];

const PendingInvitationsList = () => {
  return (
    <div className="w-full h-1/5 flex flex-col items-center overflow-auto">
      {DUMMY_INVITATIONS.map((invitation) => (
        <PendingInvitationsListItem
          key={invitation._id}
          id={invitation._id}
          username={invitation.senderId.username}
          mail={invitation.senderId.mail}
        />
      ))}
    </div>
  );
};

export default PendingInvitationsList;
