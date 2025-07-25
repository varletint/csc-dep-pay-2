import { errorHandler } from "../utils/errorHandler.js";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import Item from "../models/item.modal.js";
import crypto from "crypto";

export const webHook = async (req, res, next) => {
  const hash = crypto
    .createHmac("sha512", "sk_test_1d3f0d7cd61c3a8476b995c7b0597daa67eb2d2f")
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.sendStatus(401);
  }

  const event = req.body;
  if (event.event === "charge.success") {
    const data = event.data;
    const email = data.metadata?.email;
    const ref = data.reference;
    const amount = data.amount / 100;
    const itemId = data.metadata?.itemId;

    try {
      //   const user = await User.findOne({ email });
      //   const item = await Item.findById(itemId);
      await Payment.create({
        userId: email,
        //   : user?._id,
        itemId: itemId,
        //   : item?._id,
        amount,
        reference: ref,
        status: data.status,
        gatewayResponse: data.gateway_response,
        paidAt: new Date(data.paid_at),
      });
      console.log(`Payment ${ref} recorded.`);
    } catch (err) {
      console.error("Payment recording error:", err.message);
    }
  }
  res.sendStatus(200);
};

export const updateWebhook = async (req, res, next) => {
  try {
    const { userId, itemId } = req.body;
    const updatedWebhook = await Payment.findByIdAndUpdate(
      req.params.reference,
      {
        reference,
        $set: {
          userId,
          itemId,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedWebhook);
  } catch (error) {
    next(error);
  }
};
