"use server";

import Stripe from "stripe";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getOnboardingLink = async (email) => {
  await connectDB();
  const user = await User.findOne({ email });

  if (!user || !user.stripe_account_id) {
    throw new Error("User has not connected Stripe yet");
  }

  const accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: "http://localhost:3000/retry",
    return_url: "http://localhost:3000/dashboard",
    type: "account_onboarding",
  });

  return accountLink.url;
};

export const connectStripe = async (email) => {
  await connectDB();

  const user = await User.findOne({ email });

  if (user.stripe_account_id) {
    // already account ache, abar create korar dorkar nai
    return getOnboardingLink(email);
  }

  const account = await stripe.accounts.create({
    type: "express",
    country: "GB",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  await User.findOneAndUpdate({ email }, { stripe_account_id: account.id });

  return getOnboardingLink(email);
};

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  const user = await User.findOne({ username: to_username });

  if (!user) throw new Error("Recipient user not found");

  if (!user.stripe_account_id) {
    throw new Error("Recipient has not connected Stripe yet");
  }

  // ✅ Stripe theke real account info nao
  const account = await stripe.accounts.retrieve(user.stripe_account_id);

  console.log("CAPABILITIES:", account.capabilities);
  console.log("CHARGES ENABLED:", account.charges_enabled);
  console.log("DETAILS SUBMITTED:", account.details_submitted);
  // ✅ onboarding incomplete hole redirect link dao
  if (!account.details_submitted || !account.charges_enabled) {
    const link = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: "http://localhost:3000/retry",
      return_url: "http://localhost:3000/dashboard",
      type: "account_onboarding",
    });

    console.log("charges_enabled:", account.charges_enabled);
    console.log("details_submitted:", account.details_submitted);
    return link.url; // 🔥 payment na, onboarding e pathao
  }

  // ✅ payment session
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
            unit_amount: amount * 100,
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
      stripeAccount: user.stripe_account_id,
    },
  );

  await Payment.create({
    oid: session.id,
    amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
    status: "pending",
  });

  return session.url;
};

export const fetchUser = async (username) => {
  await connectDB();

  const payments = await Payment.find({
    to_user: username,
    status: "completed",
  }).sort({ createdAt: -1 });

  return JSON.parse(JSON.stringify(payments));
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
      bio: data.bio,
      profilePic: data.profilePic,
      coverPic: data.coverPic,
      stripe_account_id: data.stripeID,
    },
  );

  return { success: true };
};



export const  getDashboardStats = async(username)=>{
  await connectDB();

  // find all completed pyment for this user

  const payments =  await Payment.find({
      to_user: username,
      status: "completed",
    });

    console.log(payments, "Payments")

  //total ammount

  const totalAmount =  payments.reduce((sum, item)=>{
    return sum + item.amount
  }, 0)

  // totalsupport

  const totalSupport =  payments.length


  //this Month

  const now = new Date();

  const thisMonthPayments =   payments.filter((item)=>{
    const date = new Date(item.createdAt);

    return(
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()

    )
  })

  const thisMonth =  thisMonthPayments.reduce((sum, item)=>{
    return sum + item.amount
  }, 0)

  return { totalAmount, totalSupport, thisMonth}

}