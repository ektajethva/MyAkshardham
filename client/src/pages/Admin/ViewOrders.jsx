import { Package } from "lucide-react";

const orders = [
  {
    id: "#ORD001",
    customer: "Raj Patel",
    items: "Tulsi Mala, Diya Set",
    total: 749,
    status: "Delivered",
    date: "Jul 20",
  },
  {
    id: "#ORD002",
    customer: "Priya Shah",
    items: "Bhagavad Gita",
    total: 350,
    status: "Shipped",
    date: "Aug 01",
  },
  {
    id: "#ORD003",
    customer: "Amit Desai",
    items: "Puja Thali",
    total: 799,
    status: "Processing",
    date: "Aug 10",
  },
];

export default function ViewOrders() {
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
              <tr key={order.id}>
                <td className="p-4 font-mono text-foreground">
                  {order.id}
                </td>

                <td className="p-4 text-foreground">
                  {order.customer}
                </td>

                <td className="p-4 text-muted-foreground">
                  {order.items}
                </td>

                <td className="p-4 font-semibold text-foreground">
                  ₹{order.total}
                </td>

                <td className="p-4 text-muted-foreground">
                  {order.date}
                </td>

                <td className="p-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-50 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {order.status}
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