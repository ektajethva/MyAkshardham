import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const initialEvents = [
  { id: 1, title: "Janmashtami Celebration", date: "Aug 15, 2026" },
  { id: 2, title: "Diwali Aarti Night", date: "Oct 20, 2026" },
  { id: 3, title: "Rath Yatra", date: "Jul 10, 2026" },
];

export default function ManageEvents() {
  const [events, setEvents] = useState(initialEvents);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Manage Events
        </h1>

        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Event
        </Button>
      </div>

      {/* Add event form */}
      <div className="bg-card rounded-xl shadow-card p-5 mb-6">
        <h2 className="font-semibold text-foreground mb-4">
          Add New Event
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Label>Title</Label>
            <Input placeholder="Event name" className="mt-1" />
          </div>

          <div>
            <Label>Date</Label>
            <Input type="date" className="mt-1" />
          </div>

          <div className="flex items-end">
            <Button className="w-full">Add Event</Button>
          </div>
        </form>
      </div>

      {/* Events list */}
      <div className="bg-card rounded-xl shadow-card divide-y divide-border">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-4"
          >
            <div>
              <p className="font-semibold text-foreground">
                {event.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {event.date}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Pencil className="h-3.5 w-3.5" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}