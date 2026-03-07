import { Link } from "react-router-dom";
import { Calendar, Flame, Car, MapPin, Ticket, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function UserDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Welcome */}
      <div className="gradient-saffron rounded-2xl p-6 md:p-8 mb-8 text-primary-foreground">
        <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
          Jai Swaminarayan! 🙏
        </h1>
        <p className="opacity-90">
          Welcome back, Raj. May your day be blessed.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-5 shadow-card text-center"
            >
              <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <h2 className="font-heading text-xl font-bold mb-4 text-foreground">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} to={action.path}>
              <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow flex flex-col items-center gap-3 text-center">
                
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <span className="font-medium text-sm text-foreground">
                  {action.label}
                </span>

              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}