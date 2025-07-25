import React, { useState } from "react";
import Paystack from "@paystack/inline-js";

export default function Pay() {
  const [email, setEmail] = useState("");
  const [itemId, setItemId] = useState("");
  const [amount, setAmount] = useState("");

  console.log(email, itemId, amount);

  const payWithPaystack = () => {
    const popup = new Paystack();

    popup.newTransaction({
      key: "pk_test_824b1c362014734e6d55e5e719c2cbd0ae40d361",
      email: email,
      amount: Number(amount) * 100,

      metadata: { itemId: itemId, email: email },
      callback: async function (response) {
        alert("Payment complete! Reference: " + response.reference);
      },
      onSuccess: (transaction) => {
        console.log(transaction);
      },
      onLoad: (response) => {
        console.log("onLoad: ", response);
      },
      onCancel: () => {
        console.log("onCancel");
      },
      onError: (error) => {
        console.log("Error: ", error.message);
      },
    });
    // const handler = window.Paystack.newTransaction({
    //   key: "pk_test_824b1c362014734e6d55e5e719c2cbd0ae40d361", // Replace with your Paystack public key
    //   email,
    //   amount: amount * 100,
    //   metadata: {
    //     itemId,
    //   },
    //   callback: async function (response) {
    //     alert("Payment complete! Reference: " + response.reference);
    //     // Optional: Notify backend
    //     // try {
    //     //   const res = await fetch("http://localhost:5000/api/notify", {
    //     //     method: "POST",
    //     //     headers: { "Content-Type": "application/json" },
    //     //     body: JSON.stringify({
    //     //       reference: response.reference,
    //     //       email,
    //     //       itemId,
    //     //       amount,
    //     //     }),
    //     //   });
    //     //   const data = await res.json();
    //     //   console.log("Server response:", data);
    //     // } catch (err) {
    //     //   console.error("Failed to notify backend:", err.message);
    //     // }
    //   },
    //   onClose: function () {
    //     alert("Transaction was not completed, window closed.");
    //   },
    // });
    // handler.openIframe();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>im tired man!</h2>
      <input
        placeholder='User Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder='Item ID'
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder='Amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <br />
      <button onClick={payWithPaystack}>Pay Now</button>
    </div>
  );
}
