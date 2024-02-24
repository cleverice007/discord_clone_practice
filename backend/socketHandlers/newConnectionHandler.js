import { updateFriendsPendingInvitations, updateFriends } from "./updates/friends.js";
import { addNewConnectedUser } from "../serverStore.js";

const newConnectionHandler = async (socket, io) => {
    const userDetails = socket.user;
  
      addNewConnectedUser({
      socketId: socket.id,
      userId: userDetails.userId,
    });
  
    // update pending friends invitations list
    updateFriendsPendingInvitations(userDetails.userId);
  
    // update friends list
    updateFriends(userDetails.userId);
  };
  
  export default newConnectionHandler;
  