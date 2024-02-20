import React, { useState } from "react";
import Avatar from "../../Avatar";
import InvitationDecisionButton from "./InvitationDecisionButton";
const PendingInvitationsListItem = ({
  id,
  username,
  mail,
  acceptFriendInvitation = () => {},
  rejectFriendInvitation = () => {},
}) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleAcceptInvitation = () => {
    acceptFriendInvitation({ id });
    setButtonsDisabled(true);
  };

  const handleRejectInvitation = () => {
    rejectFriendInvitation({ id });
    setButtonsDisabled(true);
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
