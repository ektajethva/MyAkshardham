import { useState } from "react";
import "./BookVisitPage.css";
import { Calendar } from "lucide-react";

const timeSlots = [
  "6:00 AM",
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
];

function BookVisitPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [persons, setPersons] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !time) {
      alert("Please select date and time slot");
      return;
    }

    alert(
      `Booking Confirmed ✅\nDate: ${date}\nTime: ${time}\nPersons: ${persons}`
    );
  };

  return (
    <div className="visit-container">
      <h1 className="visit-title">Book Temple Visit</h1>
      <p className="visit-subtitle">
        Schedule your visit to MyAkshardham
      </p>

      <form className="visit-form" onSubmit={handleSubmit}>

        {/* Date */}
        <div className="form-group">
          <label>Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Time Slot */}
        <div className="form-group">
          <label>Time Slot</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Choose a time slot</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Persons */}
        <div className="form-group">
          <label>Number of Persons</label>
          <input
            type="number"
            min="1"
            max="20"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
          />
        </div>

        <button type="submit" className="visit-btn">
          <Calendar size={16} />
          Confirm Booking
        </button>

      </form>
    </div>
  );
}

export default BookVisitPage;