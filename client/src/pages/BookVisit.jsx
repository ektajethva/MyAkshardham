import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const timeSlots = ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

export default function BookVisitPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Book Temple Visit</h1>
      <p className="text-muted-foreground mb-8">Schedule your visit to MyAkshardham</p>

      <form className="space-y-5 bg-card rounded-2xl shadow-card p-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label htmlFor="date">Select Date</Label>
          <Input id="date" type="date" className="mt-1" />
        </div>

        <div>
          <Label>Time Slot</Label>
          <Select>
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
          <Input id="persons" type="number" min={1} max={20} defaultValue={1} className="mt-1" />
        </div>

        <Button className="w-full" size="lg">
          <Calendar className="h-4 w-4 mr-2" /> Confirm Booking
        </Button>
      </form>
    </div>
  );
}