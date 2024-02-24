import React, { useState } from "react";
import Avatar from "../../Avatar";
import InvitationDecisionButton from "./InvitationDecisionButton";
import { useAcceptMutation, useRejectMutation } from '../../../slices/friendApiSlice';

const PendingInvitationsListItem = ({ id, username, mail }) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [acceptFriendInvitation] = useAcceptMutation();
  const [rejectFriendInvitation] = useRejectMutation();

  const handleAcceptInvitation = async () => {
    try {
      await acceptFriendInvitation({ id }).unwrap();
      setButtonsDisabled(true);
    } catch (err) {
      console.error('Failed to accept invitation:', err);
    }
  };

  const handleRejectInvitation = async () => {
    try {
      await rejectFriendInvitation({ id }).unwrap();
      setButtonsDisabled(true);
    } catch (err) {
      console.error('Failed to reject invitation:', err);
    }
  };

  return (
    <div className="w-full p-2 flex justify-between items-center bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer" title={mail}>
      <Avatar username={username} />
      <span className="ml-2 font-bold text-gray-300 flex-grow">{username}</span>
      <InvitationDecisionButton
        disabled={buttonsDisabled}
        acceptInvitationHandler={handleAcceptInvitation}
        rejectInvitationHandler={handleRejectInvitation}
      />
    </div>
  );
};

export default PendingInvitationsListItem;

