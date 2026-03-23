import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const timeSlots = ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

export default function BookVisitPage() {

  const [date, setDate] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [persons, setPersons] = useState(1)

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

    if(!user){
      toast.error("Please Login First");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/booking/addVisit", {
        user_id: user.user_id,
        name: user.name,
        visit_date: date,
        number_of_person: Number(persons),
        time_slot: timeSlot
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Your Visit Booked");
      }

    } catch (error) {
      toast.error(error.response?.data?.error|| error.response?.data?.message || "Booking Failed");
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Book Temple Visit</h1>
      <p className="text-muted-foreground mb-8">Schedule your visit to MyAkshardham</p>

      <form className="space-y-5 bg-card rounded-2xl shadow-card p-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="date">Select Date</Label>
          <Input id="date" type="date" className="mt-1" onChange={(e)=>{setDate(e.target.value)}} />
        </div>

        <div>
          <Label>Time Slot</Label>
          <Select onValueChange={(value)=>{setTimeSlot(value)}}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Choose a time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="persons">Number of Persons</Label>
          <Input id="persons" type="number" min={1} max={20} defaultValue={1} className="mt-1" onChange={(e)=>setPersons(e.target.value)} />
        </div>

        <Button className="w-full" size="lg">
          <Calendar className="h-4 w-4 mr-2" /> Confirm Booking
        </Button>
      </form>
    </div>
  );
}