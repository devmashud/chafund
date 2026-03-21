import PaymentForm from "@/components/PaymentForm";

const Username = async ({ params }) => {
  const { username } = await params;

  return (
    <div className="">
      <PaymentForm username={username} />
    </div>
  );
};

export default Username;
