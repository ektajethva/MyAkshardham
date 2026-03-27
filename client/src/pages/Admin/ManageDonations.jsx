import { useState } from "react";
import { Heart, IndianRupee, TrendingUp, Users, Search, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Progress } from "../../components/ui/progress";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect } from "react";
import axios from "axios";

// const stats = [
//   { label: "Total Collected", value: "₹3,27,500", icon: IndianRupee, change: "+18%", color: "text-primary" },
//   { label: "This Month", value: "₹52,300", icon: TrendingUp, change: "+12%", color: "text-green-600" },
//   { label: "Total Donors", value: "142", icon: Users, change: "+9", color: "text-blue-600" },
//   { label: "Avg Donation", value: "₹2,306", icon: Heart, change: "+5%", color: "text-primary" },
// ];

// const donors = [
//   { id: "D001", name: "Raj Patel", email: "raj@email.com", amount: 5001, date: "Feb 25, 2026", method: "UPI" },
//   { id: "D002", name: "Priya Shah", email: "priya@email.com", amount: 2501, date: "Feb 24, 2026", method: "Card" },
//   { id: "D003", name: "Amit Desai", email: "amit@email.com", amount: 1001, date: "Feb 23, 2026", method: "UPI" },
//   { id: "D004", name: "Neha Joshi", email: "neha@email.com", amount: 501, date: "Feb 22, 2026", method: "Net Banking" },
//   { id: "D005", name: "Vivek Sharma", email: "vivek@email.com", amount: 10001, date: "Feb 21, 2026", method: "UPI" },
//   { id: "D006", name: "Meera Iyer", email: "meera@email.com", amount: 251, date: "Feb 20, 2026", method: "Card" },
//   { id: "D007", name: "Kiran Modi", email: "kiran@email.com", amount: 5001, date: "Feb 19, 2026", method: "UPI" },
// ];

const goalAmount = 500000;
// const collectedAmount = 327500;

export default function ManageDonations() {

  const [stats, setStats] = useState({
    totalAmount: 0,
    totalDonors: 0,
    avgDonation: 0,
    thisMonthAmount: 0
  })
  const [donors, setDonors] = useState([])

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const collectedAmount = stats.totalAmount;
  const progress = Math.min((collectedAmount / goalAmount) * 100, 100);

  const filteredDonors = donors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.method === filter;
    return matchSearch && matchFilter;
  });

  const statsData = [
  {
    label: "Total Collected",
    value: `₹${stats.totalAmount.toLocaleString("en-IN")}`,
    icon: IndianRupee,
    change: "+18%",
    color: "text-primary"
  },
  {
    label: "This Month",
    value: `₹${stats.thisMonthAmount.toLocaleString("en-IN")}`,
    icon: TrendingUp,
    change: "+12%",
    color: "text-green-600"
  },
  {
    label: "Total Donors",
    value: stats.totalDonors,
    icon: Users,
    change: "+9",
    color: "text-blue-600"
  },
  {
    label: "Avg Donation",
    value: `₹${stats.avgDonation.toLocaleString("en-IN")}`,
    icon: Heart,
    change: "+5%",
    color: "text-primary"
  }
];

  useEffect(() => {
   fetchDonation()
   fetchStats()
  }, [])

  const fetchDonation = async () => {
     try {
      const res = await axios.get("http://localhost:5000/payment/Donation");

      const formatted = res.data.map((d) => ({
        id: d.donor_id,
        name: d.users?.name || "User " + d.user_id,
        email: d.users?.email || "N/A",
        amount: d.amount,
        date: new Date(d.date).toLocaleDateString("en-IN"),
        method: d.methods,
      }));

      setDonors(formatted);
    } catch (err) {
      console.log(err);
    }
  }
  
  const fetchStats = async () => {
     try {
        const res = await axios.get("http://localhost:5000/payment/Donation/Stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Manage Donations</h1>
          <p className="text-sm text-muted-foreground">Track donations and donor history</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsData.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{s.change}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Goal progress */}
      <div className="bg-card rounded-xl border border-border shadow-card p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Fundraising Goal Progress</span>
          <span className="text-sm text-primary font-bold">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-3 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹{collectedAmount.toLocaleString("en-IN")} collected</span>
          <span>Goal: ₹{goalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border shadow-card p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search donors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="UPI">UPI</SelectItem>
              <SelectItem value="Card">Card</SelectItem>
              <SelectItem value="Net Banking">Net Banking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Donor table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-muted-foreground font-medium">ID</th>
                <th className="pb-3 text-muted-foreground font-medium">Donor</th>
                <th className="pb-3 text-muted-foreground font-medium hidden sm:table-cell">Email</th>
                <th className="pb-3 text-muted-foreground font-medium">Amount</th>
                <th className="pb-3 text-muted-foreground font-medium hidden md:table-cell">Method</th>
                <th className="pb-3 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDonors.map((d) => (
                <tr key={d.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-mono text-muted-foreground text-xs">{d.id}</td>
                  <td className="py-3 font-medium text-foreground">{d.name}</td>
                  <td className="py-3 text-muted-foreground hidden sm:table-cell">{d.email}</td>
                  <td className="py-3 font-semibold text-primary">₹{d.amount.toLocaleString("en-IN")}</td>
                  <td className="py-3 hidden md:table-cell">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{d.method}</span>
                  </td>
                  <td className="py-3 text-muted-foreground text-xs">{d.date}</td>
                </tr>
              ))}
              {filteredDonors.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No donors found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
