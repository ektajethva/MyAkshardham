import "./AdminDashboard.css";
import { Users, Ticket, Calendar, IndianRupee } from "lucide-react";

const stats = [
  { label: "Total Users", value: "1,284", icon: Users, change: "+12%" },
  { label: "Total Bookings", value: "856", icon: Ticket, change: "+8%" },
  { label: "Total Events", value: "24", icon: Calendar, change: "+2" },
  { label: "Revenue", value: "₹4,52,000", icon: IndianRupee, change: "+15%" },
];

export default function AdminDashboard() {
  return (
    <div className="admin-container">

      <h1 className="admin-title">Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-top">
              <div className="stat-icon">
                <s.icon size={20} />
              </div>
              <span className="stat-change">{s.change}</span>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="table-card">
        <h2 className="table-title">Recent Bookings</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {[
                { id: "#B001", name: "Raj Patel", type: "Visit", date: "Aug 15", status: "Confirmed" },
                { id: "#B002", name: "Priya Shah", type: "Seva", date: "Aug 16", status: "Pending" },
                { id: "#B003", name: "Amit Desai", type: "Parking", date: "Aug 15", status: "Confirmed" },
              ].map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.type}</td>
                  <td>{b.date}</td>
                  <td>
                    <span className={b.status === "Confirmed" ? "status-confirmed" : "status-pending"}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}