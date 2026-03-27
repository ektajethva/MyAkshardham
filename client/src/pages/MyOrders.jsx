import axios from "axios";
import { Package } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

// const orders = [
//   { id: "#ORD001", date: "Jul 20, 2026", items: "Tulsi Mala, Diya Set", total: 749, status: "Delivered" },
//   { id: "#ORD002", date: "Aug 01, 2026", items: "Bhagavad Gita", total: 350, status: "Shipped" },
//   { id: "#ORD003", date: "Aug 10, 2026", items: "Puja Thali", total: 799, status: "Processing" },
// ];

const statusColor = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-accent text-accent-foreground",
};

export default function MyOrdersPage() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
   fetchOrders()
  }, [])

  const fetchOrders = async () => {
     const user = JSON.parse(localStorage.getItem("user"));

     try {
    if (!user?.user_id) {
      console.log("User not found");
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/Product/getUserOrder/${user.user_id}`
    );

    console.log(res.data)
    const formatted = res.data.map((o) => ({
      id: "#ORD" + o.order_id,
      date: new Date(o.date).toLocaleDateString("en-IN"),
      items: o.product_name,
      total: o.total,
      status: o.status
    }));

    setOrders(formatted);

  } catch (err) {
    console.log(err);
  }
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl bg-gray-100">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-card rounded-xl shadow-card p-5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">{o.id}</p>
                <p className="text-sm text-muted-foreground">{o.items}</p>
                <p className="text-xs text-muted-foreground">{o.date}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[o.status]}`}>
                {o.status}
              </span>
              <p className="font-bold text-foreground mt-2">₹{o.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}