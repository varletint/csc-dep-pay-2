import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    name: {
      type: String,
      // required: true,
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
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
    matricNumber: {
      type: String,
      unique: true,
      required: true,
    },

    //
  },
  {
    timestamps: true,
  }
);

const UserTwo = mongoose.model("UserTwo", UserSchema);

export default UserTwo;
