import React from "react";
import { CheckIcon, XIcon } from '@heroicons/react/solid';

const InvitationDecisionButtons = ({
  disabled,
  acceptInvitationHandler,
  rejectInvitationHandler,
}) => {
  return (
    <div className="flex">
      <button
        className={`p-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500'} bg-green-600 rounded`}
        disabled={disabled}
        onClick={acceptInvitationHandler}
      >
        <CheckIcon className="h-5 w-5 text-white" />
      </button>
      <button
        className={`p-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'} bg-red-600 rounded ml-2`}
        disabled={disabled}
        onClick={rejectInvitationHandler}
      >
        <XIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export default InvitationDecisionButtons;
