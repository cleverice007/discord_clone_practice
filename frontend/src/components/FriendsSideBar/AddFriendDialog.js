import React, { useState, useEffect } from "react";
import { validateMail } from "../../utils/validators";
import InputWithLabel from "../InputWithLabel";
import PrimaryButton from "../PrimaryButton";
import { useDispatch } from 'react-redux';
import {setPendingFriendsInvitations} from '../../slices/friendSlice';
import {useInviteMutation} from '../../slices/friendApiSlice';


const AddFriendDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState("");

  const dispatch = useDispatch();
  const [invite] = useInviteMutation();


  const handleSendInvitation = async () => {
    try {
      const response = await invite({ targetMailAddress: mail }).unwrap();
      console.log('Invitation sent successfully:', response);
    } catch (error) {
      console.error('Failed to send invitation:', error);
    }
  };
  

  const handleClose = () => {
    closeDialogHandler();
    setMail("");
  };

  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);

  if (!isDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex" onClick={handleClose}>
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg" onClick={(e) => e.stopPropagation()}> 
        <div className="text-lg font-semibold">Invite a Friend</div>
        <div className="mt-4">
          <div className="text-sm">Enter e-mail address of friend which you would like to invite</div>
          <InputWithLabel
            label="Mail"
            type="text"
            value={mail}
            setValue={setMail}
            placeholder="Enter mail address"
          />
        </div>
        <div className="flex justify-end mt-4">
          <PrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send"
            additionalStyles="mx-4 my-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AddFriendDialog;