import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Flame } from "lucide-react";

const sevaTypes = [
  "Maha Aarti",
  "Shangar Aarti",
  "Annakut Seva",
  "Abhishek",
  "Thal Seva",
];

export default function SevaPage() {

  const handleSubmit = (e) => {
    e.preventDefault();
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

          <Select>
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
          <Input id="date" type="date" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="donation">Donation Amount (₹)</Label>
          <Input
            id="donation"
            type="number"
            min={0}
            placeholder="101"
            className="mt-1"
          />
        </div>

        <Button className="w-full" size="lg">
          <Flame className="h-4 w-4 mr-2" />
          Book Seva
        </Button>

      </form>
    </div>
  );
}