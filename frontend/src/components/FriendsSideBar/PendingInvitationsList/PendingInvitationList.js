import React from "react";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
import { useSelector } from 'react-redux';


const PendingInvitationsList = () => {
  const pendingFriendsInvitations = useSelector((state) => state.friends.pendingFriendsInvitations);
  
  
  return (
    <div className="w-full h-1/5 flex flex-col items-center overflow-auto">
      {pendingFriendsInvitations.map((invitation) => (
        <PendingInvitationsListItem
          key={invitation._id}
          id={invitation._id}
          username={invitation.senderId?.username}
          mail={invitation.senderId?.mail}
        />
      ))}
    </div>
  );
};

export default PendingInvitationsList;
