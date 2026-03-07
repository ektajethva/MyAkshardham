import { Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";

const cartItems = [
  { id: 1, name: "Tulsi Mala", price: 250, qty: 2 },
  { id: 2, name: "Brass Diya Set", price: 499, qty: 1 },
];

export default function CartPage() {
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between bg-card rounded-xl shadow-card p-4 mb-3">
          <div>
            <h3 className="font-semibold text-foreground">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              Qty: {item.qty} × ₹{item.price}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-foreground">₹{item.price * item.qty}</span>
            <button className="text-destructive hover:opacity-70">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6 mb-4 px-1">
        <span className="font-heading font-semibold text-lg text-foreground">Total</span>
        <span className="font-bold text-xl text-primary">₹{total}</span>
      </div>

      <Button className="w-full" size="lg">Proceed to Checkout</Button>
    </div>
  );
}