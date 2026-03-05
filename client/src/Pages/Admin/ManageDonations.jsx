import { useState } from "react";
import "./ManageDonations.css";
import { Heart, IndianRupee, TrendingUp, Users, Search, Download } from "lucide-react";

const stats = [
  { label: "Total Collected", value: "₹3,27,500", icon: IndianRupee, change: "+18%" },
  { label: "This Month", value: "₹52,300", icon: TrendingUp, change: "+12%" },
  { label: "Total Donors", value: "142", icon: Users, change: "+9" },
  { label: "Avg Donation", value: "₹2,306", icon: Heart, change: "+5%" },
];

const donors = [
  { id: "D001", name: "Raj Patel", email: "raj@email.com", amount: 5001, date: "Feb 25, 2026", method: "UPI" },
  { id: "D002", name: "Priya Shah", email: "priya@email.com", amount: 2501, date: "Feb 24, 2026", method: "Card" },
  { id: "D003", name: "Amit Desai", email: "amit@email.com", amount: 1001, date: "Feb 23, 2026", method: "UPI" },
  { id: "D004", name: "Neha Joshi", email: "neha@email.com", amount: 501, date: "Feb 22, 2026", method: "Net Banking" },
];

function ManageDonations() {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const goalAmount = 500000;
  const collectedAmount = 327500;

  const progress = Math.min((collectedAmount / goalAmount) * 100, 100);

  const filteredDonors = donors.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "all" || d.method === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="donation-container">

      <div className="donation-header">
        <div>
          <h1>Manage Donations</h1>
          <p>Track donations and donor history</p>
        </div>

        <button className="export-btn">
          <Download size={16}/> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div className="stat-top">
                <Icon size={22}/>
                <span className="stat-change">{s.change}</span>
              </div>

              <h2>{s.value}</h2>
              <p>{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Goal Progress */}
      <div className="goal-card">
        <div className="goal-top">
          <span>Fundraising Goal Progress</span>
          <span>{progress.toFixed(0)}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="goal-info">
          <span>₹{collectedAmount.toLocaleString("en-IN")} collected</span>
          <span>Goal: ₹{goalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="table-card">

        <div className="table-filters">

          <div className="search-box">
            <Search size={16}/>
            <input
              placeholder="Search donors..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>

          <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >
            <option value="all">All Methods</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>

        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Donor</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {filteredDonors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    No donors found
                  </td>
                </tr>
              ) : (

                filteredDonors.map((d)=>(
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td className="amount">₹{d.amount.toLocaleString("en-IN")}</td>
                    <td>
                      <span className="method">{d.method}</span>
                    </td>
                    <td>{d.date}</td>
                  </tr>
                ))

              )}

            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default ManageDonations;