import serverStore from "../store/serverStore";
import friendsUpdate from "../socketHandlers/updates/friends";

const newConnectionHandler = async (socket, io) => {
    const userDetails = socket.user;
  
    serverStore.addNewConnectedUser({
      socketId: socket.id,
      userId: userDetails.userId,
    });
  
    // update pending friends invitations list
    friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);
  
    // update friends list
    friendsUpdate.updateFriends(userDetails.userId);
  };
  
  module.exports = newConnectionHandler;
  