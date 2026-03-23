import { Button } from "../components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CartPage() {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQty, totalPrice } = useCart();

  const handleCheckout = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login to continue checkout");
    navigate("/login");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: totalPrice * 100,
    currency: "INR",
    name: "MyAkshardham Shop",
    description: "Shop Order Payment",

    handler: async function (response) {
      try {
          const user = JSON.parse(localStorage.getItem("user"));

          // ✅ Step 1: Save main payment
          const paymentRes = await axios.post(
            "http://localhost:5000/payment/add_Product_Payment",
            {
              total_amount: totalPrice,
              payment_method: "Razorpay",
              payment_status: "success",
              payment_date: new Date().toISOString(),
              user_id: user.user_id,
              razorpay_payment_id: response.razorpay_payment_id
            }
          );

          const payment_id = paymentRes.data.payment.id; // 👈 important

          // ✅ Step 2: Save items
          const itemsPayload = items.map((item) => ({
            payment_id: payment_id,
            product_id: item.id,
            quantity: item.qty,
            price: item.price
          }));

          await axios.post(
            "http://localhost:5000/payment/add_Product_Items",
            itemsPayload
          );

          // ✅ Step 3: Save receipt (optional)
          const receiptData = {
            paymentId: response.razorpay_payment_id,
            name: user.name,
            email: user.email,
            items: items,
            total: totalPrice,
            date: new Date().toLocaleString()
          };

          localStorage.setItem("receipt", JSON.stringify(receiptData));

          navigate("/receipt");

        } catch (error) {
          console.log("Payment save error:", error);
          alert("Payment done but failed to store order");
        }
    },

    prefill: {
      name: user.name,
      email: user.email
    },

    theme: {
      color: "#f97316"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-lg">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />

        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          Your Cart is Empty
        </h1>

        <p className="text-muted-foreground mb-6">
          Browse the shop to add items
        </p>

        <Link to="/shop">
          <Button>Go to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
        Your Cart
      </h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-card rounded-xl shadow-card p-4 mb-3"
        >
          <div className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="h-12 w-12 rounded-lg object-cover"
            />

            <div>
              <h3 className="font-semibold text-foreground">
                {item.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                ₹{item.price} each
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-border rounded-md">
              
              <button
                className="p-1 hover:bg-secondary rounded-l-md"
                onClick={() => updateQty(item.id, item.qty - 1)}
              >
                <Minus className="h-3 w-3" />
              </button>

              <span className="px-2 text-sm font-medium">
                {item.qty}
              </span>

              <button
                className="p-1 hover:bg-secondary rounded-r-md"
                onClick={() => updateQty(item.id, item.qty + 1)}
              >
                <Plus className="h-3 w-3" />
              </button>

            </div>

            <span className="font-bold text-foreground w-16 text-right">
              ₹{item.price * item.qty}
            </span>

            <button
              className="text-destructive hover:opacity-70"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6 mb-4 px-1">
        <span className="font-heading font-semibold text-lg text-foreground">
          Total
        </span>

        <span className="font-bold text-xl text-primary">
          ₹{totalPrice}
        </span>
      </div>

      <Button className="w-full" size="lg" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
}