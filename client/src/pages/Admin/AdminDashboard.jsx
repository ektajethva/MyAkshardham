import axios from "axios";
import { Users, Ticket, Calendar, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";

// const stats = [
//   { label: "Total Users", value: "1,284", icon: Users, change: "+12%" },
//   { label: "Total Bookings", value: "856", icon: Ticket, change: "+8%" },
//   { label: "Total Events", value: "24", icon: Calendar, change: "+2" },
//   { label: "Revenue", value: "₹4,52,000", icon: IndianRupee, change: "+15%" },
// ];

export default function AdminDashboard() {

  const [stats, setStats] = useState([])
  const [booking, setBooking] = useState([])

  useEffect(() => {
   fetchDashboard();
  }, [])

  const fetchDashboard = async () => {
     try {
    const statsRes = await axios.get("http://localhost:5000/admin/stats");
    const bookingRes = await axios.get("http://localhost:5000/admin/recentBooking");

    setStats([
      {
        label: "Total Users",
        value: statsRes.data.total_users || 0,
        icon: Users,
        change: "+12%"
      },
      {
        label: "Total Bookings",
        value: statsRes.data.total_bookings || 0,
        icon: Ticket,
        change: "+8%"
      },
      {
        label: "Total Events",
        value: statsRes.data.total_events || 0,
        icon: Calendar,
        change: "+2"
      },
      {
        label: "Revenue",
        value: `₹${statsRes.data.revenue}` || 0,
        icon: IndianRupee,
        change: "+15%"
      },
    ]);

    console.log("STATS:", statsRes.data);
    setBooking(bookingRes.data);

  } catch (err) {
    console.log(err);
  }
  }
  
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card rounded-xl shadow-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {s.change}
                </span>
              </div>

              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent bookings */}
      <div className="bg-card rounded-xl shadow-card p-5">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-muted-foreground font-medium">ID</th>
                <th className="pb-3 text-muted-foreground font-medium">Name</th>
                <th className="pb-3 text-muted-foreground font-medium">Type</th>
                <th className="pb-3 text-muted-foreground font-medium">Date</th>
                <th className="pb-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {/* {[
                {
                  id: "#B001",
                  name: "Raj Patel",
                  type: "Visit",
                  date: "Aug 15",
                  status: "Confirmed",
                },
                {
                  id: "#B002",
                  name: "Priya Shah",
                  type: "Seva",
                  date: "Aug 16",
                  status: "Pending",
                },
                {
                  id: "#B003",
                  name: "Amit Desai",
                  type: "Parking",
                  date: "Aug 15",
                  status: "Confirmed",
                },
              ].map((b) => (
                <tr key={b.id}>
                  <td className="py-3 font-mono text-foreground">{b.id}</td>
                  <td className="py-3 text-foreground">{b.name}</td>
                  <td className="py-3 text-foreground">{b.type}</td>
                  <td className="py-3 text-muted-foreground">{b.date}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        b.status === "Confirmed"
                          ? "bg-green-50 text-green-700"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))} */}

              {booking.map((b)=>(
                <tr key={b.id}>
                  <td className="py-3 font-mono text-foreground">
                    #{b.id}
                  </td>

                  <td className="py-3 text-foreground">
                    {b.name}
                  </td>

                  <td className="py-3 text-foreground">
                    Visit
                  </td>

                  <td className="py-3 text-muted-foreground">
                    {new Date(b.visit_date || b.created_at).toLocaleDateString()}
                  </td>

                  <td className="py-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        b.status === "Confirmed"
                          ? "bg-green-50 text-green-700"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
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