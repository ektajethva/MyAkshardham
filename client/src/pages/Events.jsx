import { Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "../hooks/use-toast";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/Event/getEvents");
      const data = await res.json();

      setEvents(data);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Temple Events</h1>
      <p className="text-muted-foreground mb-8">
        Discover and participate in upcoming celebrations
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((e) => (
          <div
            key={e.event_id}
            className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
          >
            <img src={e.image_url} alt={e.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {e.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {e.time}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{e.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{e.description}</p>
              <Link to={`/events/${e.event_id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}