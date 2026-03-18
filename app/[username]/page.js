import PaymentForm from "@/components/PaymentForm";

const Username = async ({ params }) => {
  const { username } = await params;

  return (
    <div className="p-10">
      <h1>@{username}</h1>

      <PaymentForm username={username} />
    </div>
  );
};

export default Username;