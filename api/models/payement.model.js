import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userdId: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
      // required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    reference: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    },
    gatewayResponse: {
      tyepe: String,
      required: true,
    },
    paidAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const payement = mongoose.model("payment", paymentSchema);

export default payement;
