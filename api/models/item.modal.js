import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
      // unique: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
