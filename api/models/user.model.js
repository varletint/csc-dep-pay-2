import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStudent: {
      type: Boolean,
      default: false,
    },
    matricNumber: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserTwo = mongoose.model("UserTwo", UserSchema);

export default UserTwo;
