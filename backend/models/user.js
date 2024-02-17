import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
});

const user = mongoose.model("user", userSchema);

export default user;
