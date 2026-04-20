import Stripe from "stripe";
import { headers } from "next/headers";
import Payment from "@/models/Payment";
import connectDB from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  const body = await req.text();

  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return new Response("No signature", { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ Webhook error:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const existingPayment = await Payment.findOne({
      oid: session.id,
    });

    if (existingPayment?.status === "completed") {
      console.log("⚠️ Already processed");
      return new Response("ok", { status: 200 });
    }

    await Payment.findOneAndUpdate(
      { oid: session.id },
      { status: "completed" },
      { new: true }
    );

    console.log("✅ Payment updated once");
  }

  return new Response("ok", { status: 200 });
}