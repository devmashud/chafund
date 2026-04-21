import Stripe from "stripe";
import Payment from "@/models/Payment";
import connectDB from "@/lib/db";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req) {
  await connectDB();

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.log("❌ Webhook Error:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  console.log("👉 EVENT:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const paymentId = session.metadata?.paymentId;

    if (!paymentId) {
      console.log("❌ No paymentId in metadata");
      return new Response("No metadata", { status: 400 });
    }

    await Payment.findByIdAndUpdate(paymentId, {
      status: "completed",
    });

    console.log("✅ Payment updated");
  }

  return new Response("OK", { status: 200 });
}
