import { Package } from "lucide-react";
import "./MyOrdersPage.css";

const orders = [
  { id: "#ORD001", date: "Jul 20, 2026", items: "Tulsi Mala, Diya Set", total: 749, status: "Delivered" },
  { id: "#ORD002", date: "Aug 01, 2026", items: "Bhagavad Gita", total: 350, status: "Shipped" },
  { id: "#ORD003", date: "Aug 10, 2026", items: "Puja Thali", total: 799, status: "Processing" },
];

const statusColor = {
  Delivered: "delivered",
  Shipped: "shipped",
  Processing: "processing",
};

function MyOrdersPage() {
  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>

      <div className="orders-list">
        {orders.map((o) => (
          <div key={o.id} className="order-card">

            {/* LEFT SIDE */}
            <div className="order-left">
              <Package className="order-icon" />
              <div>
                <p className="order-id">{o.id}</p>
                <p className="order-items">{o.items}</p>
                <p className="order-date">{o.date}</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="order-right">
              <span className={`order-status ${statusColor[o.status]}`}>
                {o.status}
              </span>
              <p className="order-total">₹{o.total}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrdersPage;