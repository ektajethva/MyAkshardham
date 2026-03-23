import { useEffect, createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Load user first
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // ✅ Load cart AFTER user is set
  useEffect(() => {
    if (user === null) return;

    const key = user ? `cart_${user.user_id}` : "cart_guest";
    const savedCart = localStorage.getItem(key);

    setItems(savedCart ? JSON.parse(savedCart) : []);
  }, [user]);

  // ✅ Save cart per user
  useEffect(() => {
    if (user === null) return;

    const key = user ? `cart_${user.user_id}` : "cart_guest";
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, user]);

  // 🔁 Listen for login/logout
  useEffect(() => {
    const handleUserChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    window.addEventListener("userChanged", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  // ➕ Add item
  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ❌ Remove
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // 🔄 Update qty
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty } : i
      )
    );
  };

  // 🧹 Clear cart
  const clearCart = () => {
    if (!user) return;

    const key = `cart_${user.user_id}`;
    localStorage.removeItem(key);
    setItems([]);
  };

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }

  return ctx;
};