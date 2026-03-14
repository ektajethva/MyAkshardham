import { Button } from "../components/ui/button";

export default function ReceiptPage() {

  const receipt = JSON.parse(localStorage.getItem("receipt"));

  if (!receipt) return <p>No receipt found</p>;

  return (
    <div className="container mx-auto max-w-lg py-10">

      <h1 className="text-2xl font-bold mb-4">
        Payment Successful
      </h1>

      <div className="border rounded-xl p-5">

        <p><b>Name:</b> {receipt.name}</p>
        <p><b>Email:</b> {receipt.email}</p>
        <p><b>Payment ID:</b> {receipt.paymentId}</p>
        <p><b>Date:</b> {receipt.date}</p>

        <h3 className="font-semibold mt-4 mb-2">Items</h3>

        {receipt.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} x {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-bold">
          <span>Total</span>
          <span>₹{receipt.total}</span>
        </div>

      </div>

      <Button className="w-full mt-6" onClick={() => window.print()}>
        Download Receipt
      </Button>

    </div>
  );
}