import "./ParkingPage.css";
import { Car } from "lucide-react";

function ParkingPage() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const vehicleNumber = e.target.vehicleNumber.value;
    const vehicleType = e.target.vehicleType.value;
    const date = e.target.date.value;
    const time = e.target.time.value;

    const parkingData = {
      vehicleNumber,
      vehicleType,
      date,
      time
    };

    console.log(parkingData);

    alert("Parking Booked Successfully ✅");
  };

  return (
    <div className="parking-container">
      <h1 className="parking-title">Book Your Parking</h1>
      <p className="parking-subtitle">
        Reserve your parking spot in advance
      </p>

      <form className="parking-form" onSubmit={handleSubmit}>

        {/* Vehicle Type Dropdown */}
        <div className="form-group">
          <label>Vehicle Type</label>
          <select name="vehicleType" required>
            <option value="">Select Vehicle Type</option>
            <option value="2 Wheeler">2 Wheeler 🛵</option>
            <option value="3 Wheeler">3 Wheeler 🛺</option>
            <option value="4 Wheeler">4 Wheeler 🚗</option>
            <option value="Bus">Bus 🚌</option>
          </select>
        </div>

        <div className="form-group">
          <label>Vehicle Number</label>
          <input 
            type="text"
            name="vehicleNumber"
            placeholder="GJ 01 AB 1234"
            required 
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" required />
        </div>

        <div className="form-group">
          <label>Expected Arrival Time</label>
          <input type="time" name="time" required />
        </div>

        <button type="submit" className="parking-btn">
          <Car size={18} />
          <span>Book Parking</span>
        </button>

      </form>
    </div>
  );
}

export default ParkingPage;