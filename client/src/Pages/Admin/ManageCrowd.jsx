import "./ManageCrowd.css";
import { Users } from "lucide-react";
import { useState } from "react";

function ManageCrowd() {

  const [status, setStatus] = useState("Low");
  const [count, setCount] = useState(150);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Crowd Status Updated Successfully ✅");
  };

  return (
    <div className="crowd-container">

      <h1 className="crowd-title">Manage Crowd Status</h1>

      <div className="crowd-card">

        <Users className="crowd-icon" />

        <form onSubmit={handleSubmit} className="crowd-form">

          <div className="form-group">
            <label>Current Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Current Visitor Count</label>

            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>

          <button className="crowd-btn">
            Update Status
          </button>

        </form>

      </div>
    </div>
  );
}

export default ManageCrowd;