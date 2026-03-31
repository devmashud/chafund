import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  bio: { type: String, default: null },
  profilePic: { type: String, default: null },
  coverPic: { type: String, default: null },
  stripe_account_id: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
