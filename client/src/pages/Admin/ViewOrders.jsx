import axios from "axios";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";

// const orders = [
//   {
//     id: "#ORD001",
//     customer: "Raj Patel",
//     items: "Tulsi Mala, Diya Set",
//     total: 749,
//     status: "Delivered",
//     date: "Jul 20",
//   },
//   {
//     id: "#ORD002",
//     customer: "Priya Shah",
//     items: "Bhagavad Gita",
//     total: 350,
//     status: "Shipped",
//     date: "Aug 01",
//   },
//   {
//     id: "#ORD003",
//     customer: "Amit Desai",
//     items: "Puja Thali",
//     total: 799,
//     status: "Processing",
//     date: "Aug 10",
//   },
// ];

export default function ViewOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
   fetchOrders()
  }, [])

   const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/Product/allOrders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

   const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/Product/updateOrderStatus/${id}`,
        { status: newStatus }
      );

      // update UI instantly
      setOrders(prev =>
        prev.map(order =>
          order.order_id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
        All Orders
      </h1>

      <div className="bg-card rounded-xl shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Order ID", "Customer", "Items", "Total", "Date", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="p-4 text-left text-muted-foreground font-medium"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="p-4 font-mono text-foreground">
                  #{order.order_id}
                </td>

                <td className="p-4 text-foreground">
                  {order.customer_name}
                </td>

                <td className="p-4 text-muted-foreground">
                  {order.product_name}
                </td>

                <td className="p-4 font-semibold text-foreground">
                  ₹{order.total}
                </td>

                <td className="p-4 text-muted-foreground">
                  {order.date}
                </td>

                 <td className="p-4">
                  {order.status === "Processing" && (
                    <button
                      onClick={() => updateStatus(order.order_id, "Shipped")}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Mark Shipped
                    </button>
                  )}

                  {order.status === "Shipped" && (
                    <button
                      onClick={() => updateStatus(order.order_id, "Delivered")}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Mark Delivered
                    </button>
                  )}

                  {order.status === "Delivered" && (
                    <span className="px-2 py-1 rounded-full text-xs bg-green-50 text-green-700">
                      Delivered
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}