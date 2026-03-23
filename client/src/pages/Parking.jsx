import { Car } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function ParkingPage() {

  const [date, setDate] = useState("")
  const [vehicle, setVehicle] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please Login First");
      return; // ✅ FIX
    }

    if (!vehicle || !date) {
      toast.error("Please fill all fields");
      return; // ✅ FIX
    }

    try {
      const res = await axios.post("http://localhost:5000/booking/addParking", {
        user_id: user.user_id,
        name: user.name,
        parking_date: date,
        vehicle_number: vehicle,
        time_slot:time
      });

      console.log("Response:", res); // ✅ DEBUG

      if (res.status === 200 || res.status === 201) {
        toast.success("Parking booked successfully");
      }

    } catch (error) {
      console.log("ERROR:", error); // ✅ DEBUG
      toast.error(error.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
        Book Parking
      </h1>
      <p className="text-muted-foreground mb-8">
        Reserve your parking spot in advance
      </p>

      <form
        className="space-y-5 bg-card rounded-2xl shadow-card p-6"
        onSubmit={handleSubmit}
      >
        <div>
          <Label htmlFor="vehicle">Vehicle Number</Label>
          <Input id="vehicle" placeholder="GJ 01 AB 1234" className="mt-1" onChange={(e)=>setVehicle(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" className="mt-1" onChange={(e)=>setDate(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="time">Expected Arrival Time</Label>
          <Input id="time" type="time" className="mt-1" onChange={(e)=>setTime(e.target.value)} />
        </div>

        <Button className="w-full" size="lg">
          <Car className="h-4 w-4 mr-2" /> Book Parking
        </Button>
      </form>
    </div>
  );
}