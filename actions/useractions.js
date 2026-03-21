"use server"

import Stripe from "stripe"
import Payment from "@/models/Payment"
import User from "@/models/User"
import connectDB from "@/lib/db"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const initiate = async(amount, to_username, paymentform)=>{
    await connectDB();

    //optional username cheak 
    const user = await User.findOne({username: to_username})

    // Stripe session create
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Support ${to_username}`,
          },
          unit_amount: amount * 100, // important
        },
        quantity: 1,
      },
    ],

    metadata: {
      to_user: to_username,
      message: paymentform?.message || "",
    },

    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
  });

  // 3️⃣ pending payment save (same like Razorpay)
  await Payment.create({
    oid: session.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
    status: "pending",
  });

console.log("to_username in server:", to_username); 
  return session.url;

}


export const fetchUser = async () => {
  await connectDB();

  const payments = await Payment.find({
    status: "completed",
  }).sort({ createdAt: -1 }); // latest first

  return payments;
};