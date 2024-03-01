import User from '../../models/user.js';
import FriendInvitation from "../../models/friendInvitation.js";
import { updateFriendsPendingInvitations, updateFriends } from "../../socketHandlers/updates/friends.js";

const inviteFriend = async (req, res) => {
    const { targetMailAddress } = req.body;

  const { userId, mail } = req.user;

  // check if friend that we would like to invite is not user

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry. You cannot become friend with yourself");
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please check mail address.`
      );
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent");
  }

  // check if the user whuch we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check friends list");
  }

  // create new invitation in database
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invtiation has been successfully created we would like to update friends invitations if other user is online

  // send pending invitations update to specific user
  updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).json({
    message: "Invitation has been sent"
});
};


const acceptFriendInvitation = async (req, res) => {
  try {
    const { id } = req.body;

    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).json({ error: "Error occured. Please try again" });
    }

    const { senderId, receiverId } = invitation;

    // add friends to both users
    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    // delete invitation
    await FriendInvitation.findByIdAndDelete(id);

    // update list of the friends if the users are online
    updateFriends(senderId.toString());
    updateFriends(receiverId.toString());

    // update list of friends pending invitations
    updateFriendsPendingInvitations(receiverId.toString());

    return res.json({ message: "Friend successfully added" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong. Please try again" });
  }
};

const declineFriendInvitation = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // remove that invitation from friend invitations collection
    const invitationExists = await FriendInvitation.exists({ _id: id });

    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    // update pending invitations
    updateFriendsPendingInvitations(userId);

    return res.json({ message: "Invitation successfully rejected" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong please try again" });
  }
};


export { inviteFriend, acceptFriendInvitation, declineFriendInvitation};