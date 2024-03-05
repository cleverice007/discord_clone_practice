import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: { type: String },
  date: { type: Date },
  type: { type: String },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;