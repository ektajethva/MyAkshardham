import "./ViewOrders.css";
import { Package } from "lucide-react";

const orders = [
  { id: "#ORD001", customer: "Raj Patel", items: "Tulsi Mala, Diya Set", total: 749, status: "Delivered", date: "Jul 20" },
  { id: "#ORD002", customer: "Priya Shah", items: "Bhagavad Gita", total: 350, status: "Shipped", date: "Aug 01" },
  { id: "#ORD003", customer: "Amit Desai", items: "Puja Thali", total: 799, status: "Processing", date: "Aug 10" },
];

function ViewOrders() {
  return (
    <div className="orders-container">

      <div className="orders-header">
        <Package size={28} className="orders-icon" />
        <h1>All Orders</h1>
      </div>

      <div className="orders-card">

        <table className="orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="order-id">{o.id}</td>
                <td>{o.customer}</td>
                <td className="order-items">{o.items}</td>
                <td className="order-total">₹{o.total}</td>
                <td className="order-date">{o.date}</td>

                <td>
                  <span className={`status ${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ViewOrders;