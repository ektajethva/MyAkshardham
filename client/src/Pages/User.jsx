import { Link } from "react-router-dom";
import { Calendar, Flame, Car, MapPin, Ticket, ShoppingCart } from "lucide-react";
import "./User.css";

const stats = [
  { label: "Temple Visits", value: "3", icon: MapPin },
  { label: "Seva Booked", value: "2", icon: Flame },
  { label: "Events Joined", value: "1", icon: Calendar },
  { label: "Orders", value: "4", icon: ShoppingCart },
];

const actions = [
  { label: "Book Visit", path: "/book-visit", icon: Calendar },
  { label: "Book Seva", path: "/seva", icon: Flame },
  { label: "Book Parking", path: "/parking", icon: Car },
  { label: "Tour Guide", path: "/tour-guide", icon: MapPin },
  { label: "My Orders", path: "/orders", icon: ShoppingCart },
  { label: "View Events", path: "/events", icon: Ticket },
];

function User() {
  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-box">
        <h1>Jai Swaminarayan! 🙏</h1>
        <p>Welcome back, Raj. May your day be blessed.</p>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <Icon size={22} className="stat-icon" />
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <h2 className="section-title">Quick Actions</h2>

      <div className="actions-grid">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <Link key={a.label} to={a.path} className="action-link">
              <div className="action-card">
                <div className="action-icon">
                  <Icon size={20} />
                </div>
                <span>{a.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <h1>.</h1>
    </div>
  );
}

export default User;