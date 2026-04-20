import Stripe from "stripe";
import Payment from "@/models/Payment";
import connectDB from "@/lib/db";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  const body = await req.text();
  const sig = headers().get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ Webhook Error:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  // 🔥 MAIN LOGIC
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const paymentId = session.metadata.paymentId;

    if (!paymentId) {
      console.log("❌ No paymentId in metadata");
      return new Response("No metadata", { status: 400 });
    }

    await Payment.findByIdAndUpdate(paymentId, {
      status: "completed",
    });

    console.log("✅ Payment updated to completed");
  }

  return new Response("OK", { status: 200 });
}