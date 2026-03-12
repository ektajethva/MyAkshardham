import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar, Clock, Users, User, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
];

export default function BookGuide() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const guideName = params.get("guide") || "";
  const guideLang = params.get("languages") || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    groupSize: "",
    notes: "",
  });

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time || !form.groupSize) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Confirmed!",
      description: `Your tour with ${guideName} has been booked.`,
    });

    setTimeout(() => navigate("/tour-guide"), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => navigate("/tour-guide")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Guides
      </Button>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="font-heading text-2xl">Book a Tour Guide</CardTitle>

          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <User className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">{guideName}</span>
            {guideLang && <span className="text-xs">({guideLang})</span>}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <Label htmlFor="name">Your Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label htmlFor="date">
                  <Calendar className="inline h-3.5 w-3.5 mr-1" /> Date *
                </Label>

                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  <Clock className="inline h-3.5 w-3.5 mr-1" /> Time Slot *
                </Label>

                <Select
                  value={form.time}
                  onValueChange={(v) => handleChange("time", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>

                  <SelectContent>
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>

            </div>

            <div className="space-y-2">
              <Label>
                <Users className="inline h-3.5 w-3.5 mr-1" /> Group Size *
              </Label>

              <Select
                value={form.groupSize}
                onValueChange={(v) => handleChange("groupSize", v)}
              >

                <SelectTrigger>
                  <SelectValue placeholder="Select group size" />
                </SelectTrigger>

                <SelectContent>
                  {["1-2", "3-5", "6-10", "10+"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s} people
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Special Requests</Label>

              <Textarea
                id="notes"
                placeholder="Any special requirements..."
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Confirm Booking
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}