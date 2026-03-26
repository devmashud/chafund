"use server";

import Stripe from "stripe";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const connectStripe = async(email)=>{
  await connectDB();

  const account = await stripe.accounts.create({
    type: "express",
  })

  await User.findOneAndUpdate({email}, {stripe_account_id: account.id})

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: "http://localhost:3000/retry",
    return_url: "http://localhost:3000/dashboard",
    type: "account_onboarding",
  });

  return accountLink.url;

}



export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  //optional username cheak
  const user = await User.findOne({ username: to_username });

  // Stripe session create
  const session = await stripe.checkout.sessions.create(
    {
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
    },
    {
      stripeAccount: User.stripe_account_id,
    },
  );

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
};

export const fetchUser = async () => {
  await connectDB();

  const payments = await Payment.find({
    status: "completed",
  }).sort({ createdAt: -1 }); // latest first

  return payments;
};

export const getUserData = async (email) => {
  await connectDB();
  const user = await User.findOne({ email });

  return JSON.parse(JSON.stringify(user));
};

export const updateProfile = async (email, data) => {
  await connectDB();
  // 🔴 username unique check

  const ExistingUser = await User.findOne({ username: data.username });

  if (ExistingUser && ExistingUser.email !== email) {
    throw new Error("Username already taken");
  }

  //update user

  await User.findOneAndUpdate(
    { email },
    {
      name: data.name,
      username: data.username,
      profilePic: data.profilePic,
      coverPic: data.coverPic,
      stripe_account_id: data.stripeID,
    },
  );

  return { success: true };
};
