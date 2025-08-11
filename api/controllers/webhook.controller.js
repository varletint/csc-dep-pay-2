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
    const userId = data.metadata?.userId;
    const ref = data.reference;
    const amount = data.amount / 100;
    const itemId = data.metadata?.itemId;
    const matricNumber = data.metadata?.matricNumber;
    const itemName = data.metadata?.itemName;
    const userName = data.metadata?.userName;

    try {
      await Payment.create({
        userId: userId,
        email: email,
        itemId: itemId,
        studentName: userName,
        matricNumber: matricNumber,
        itemName: itemName,
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

export const getTransactions = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 50;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const payments = await Payment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPayments = await Payment.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPayments = await Payment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // const userWithOutPassword = users.map((user) => {
    //   const { password, ...rest } = user._doc;
    //   return rest;
    // });
    res.status(200).json({ payments, totalPayments, lastMonthPayments });
  } catch (error) {
    next(error);
  }
};
