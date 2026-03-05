import { useState } from "react";
import "./ViewBookings.css";

const bookings = {
  visit: [
    { id: "#V001", name: "Raj Patel", date: "Aug 15", persons: 4, status: "Confirmed" },
    { id: "#V002", name: "Meera Shah", date: "Aug 16", persons: 2, status: "Pending" },
  ],
  seva: [
    { id: "#S001", name: "Amit Desai", date: "Aug 15", type: "Maha Aarti", status: "Confirmed" },
  ],
  parking: [
    { id: "#P001", name: "Raj Patel", date: "Aug 15", vehicle: "GJ 01 AB 1234", status: "Confirmed" },
  ],
  tour: [
    { id: "#T001", name: "John Smith", date: "Aug 17", lang: "English", status: "Pending" },
  ],
};

function BookingTable({ data, columns }) {
  return (
    <div className="table-wrapper">
      <table className="booking-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((v, j) => (
                <td key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ViewBookings() {

  const [activeTab, setActiveTab] = useState("visit");

  return (
    <div className="bookings-container">

      <h1 className="page-title">All Bookings</h1>

      {/* Tabs */}

      <div className="tabs">

        <button
          className={activeTab === "visit" ? "tab active" : "tab"}
          onClick={() => setActiveTab("visit")}
        >
          Visits
        </button>

        <button
          className={activeTab === "seva" ? "tab active" : "tab"}
          onClick={() => setActiveTab("seva")}
        >
          Seva
        </button>

        <button
          className={activeTab === "parking" ? "tab active" : "tab"}
          onClick={() => setActiveTab("parking")}
        >
          Parking
        </button>

        <button
          className={activeTab === "tour" ? "tab active" : "tab"}
          onClick={() => setActiveTab("tour")}
        >
          Tour Guide
        </button>

      </div>

      {/* Table Card */}

      <div className="table-card">

        {activeTab === "visit" && (
          <BookingTable
            data={bookings.visit}
            columns={["ID", "Name", "Date", "Persons", "Status"]}
          />
        )}

        {activeTab === "seva" && (
          <BookingTable
            data={bookings.seva}
            columns={["ID", "Name", "Date", "Type", "Status"]}
          />
        )}

        {activeTab === "parking" && (
          <BookingTable
            data={bookings.parking}
            columns={["ID", "Name", "Date", "Vehicle", "Status"]}
          />
        )}

        {activeTab === "tour" && (
          <BookingTable
            data={bookings.tour}
            columns={["ID", "Name", "Date", "Language", "Status"]}
          />
        )}

      </div>

    </div>
  );
}

export default ViewBookings;