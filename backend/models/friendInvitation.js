import mongoose from "mongoose";


const friendInvitationSchema = new mongoose.Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    });

export default mongoose.model("FriendInvitation", friendInvitationSchema);