import { Trash2 } from "lucide-react";
import "./CartPage.css";

const cartItems = [
  { id: 1, name: "Tulsi Mala", price: 250, qty: 2 },
  { id: 2, name: "Brass Diya Set", price: 499, qty: 1 },
];

function CartPage() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-card">
          <div>
            <h3 className="cart-item-name">{item.name}</h3>
            <p className="cart-item-qty">
              Qty: {item.qty} × ₹{item.price}
            </p>
          </div>

          <div className="cart-right">
            <span className="cart-price">
              ₹{item.price * item.qty}
            </span>

            <button className="cart-delete">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      <div className="cart-total">
        <span>Total</span>
        <span className="total-price">₹{total}</span>
      </div>

      <button className="checkout-btn">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartPage;