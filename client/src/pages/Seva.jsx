import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Flame } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const sevaTypes = [
  "Maha Aarti",
  "Shangar Aarti",
  "Annakut Seva",
  "Abhishek",
  "Thal Seva",
];

export default function SevaPage() {

  const [sevatype, setSevatype] = useState("")
  const [date, setDate] = useState("")


 const handleSubmit = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    toast.error("Please Login First");
    return; // ✅ FIX
  }

  if (!sevatype || !date) {
    toast.error("Please fill all fields");
    return; // ✅ FIX
  }

  try {
    const res = await axios.post("http://localhost:5000/booking/addSeva", {
      user_id: user.user_id,
      name: user.name,
      seva_type: sevatype,
      seva_date: date
    });

    console.log("Response:", res); // ✅ DEBUG

    if (res.status === 200 || res.status === 201) {
      toast.success("Seva booked successfully");
    }

  } catch (error) {
    console.log("ERROR:", error); // ✅ DEBUG
    toast.error(error.response?.data?.error || "Booking failed");
  }
};

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
        Seva & Aarti Booking
      </h1>

      <p className="text-muted-foreground mb-8">
        Participate in divine service
      </p>

      <form
        className="space-y-5 bg-card rounded-2xl shadow-card p-6"
        onSubmit={handleSubmit}
      >
        
        <div>
          <Label>Seva Type</Label>

          <Select onValueChange={(value)=>setSevatype(value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Seva" />
            </SelectTrigger>

            <SelectContent>
              {sevaTypes.map((seva) => (
                <SelectItem key={seva} value={seva}>
                  {seva}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" className="mt-1" onChange={(e)=> setDate(e.target.value)} />
        </div>

        {/* <div>
          <Label htmlFor="donation">Donation Amount (₹)</Label>
          <Input
            id="donation"
            type="number"
            min={0}
            placeholder="101"
            className="mt-1"
          />
        </div> */}

        <Button className="w-full" size="lg">
          <Flame className="h-4 w-4 mr-2" />    
          Book Seva
        </Button>

      </form>
    </div>
  );
}