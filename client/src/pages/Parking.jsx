import { Car } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function ParkingPage() {
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
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <Label htmlFor="vehicle">Vehicle Number</Label>
          <Input id="vehicle" placeholder="GJ 01 AB 1234" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="time">Expected Arrival Time</Label>
          <Input id="time" type="time" className="mt-1" />
        </div>

        <Button className="w-full" size="lg">
          <Car className="h-4 w-4 mr-2" /> Book Parking
        </Button>
      </form>
    </div>
  );
}