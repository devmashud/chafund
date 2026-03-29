import PaymentForm from "@/components/PaymentForm";
import connectDB from "@/lib/db";
import User from "@/models/User";

const Username = async ({ params }) => {
  // ✅ MUST unwrap Promise
  const { username } = await params;

  await connectDB();

  const user = await User.findOne({ username }).lean();

  console.log("USERNAME:", username);
  console.log("USER:", user);

  if (!user) return <div>User not found</div>;

  return (
    <PaymentForm
      username={username}
      user={JSON.parse(JSON.stringify(user))}
    />
  );
};

export default Username;