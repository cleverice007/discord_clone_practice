import React, { useState } from "react";
import PrimaryButton from '../PrimaryButton';
import AddFriendDialog from "./AddFriendDialog";

const AddFriendButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
  <PrimaryButton
        className="mt-2.5 ml-1.25 w-4/5 h-7.5 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
        onClick={handleOpenAddFriendDialog}
        label="Add Friend"
      />
      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}
      />
    </>
  );
};

export default AddFriendButton;
