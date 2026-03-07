// import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";
import event1 from "../assets/event-1.jpg";
import event2 from "../assets/event-2.jpg";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const events = [
  {
    id: 1,
    title: "Janmashtami Celebration",
    date: "Aug 15, 2026",
    time: "6:00 PM",
    image: event1,
    desc: "Grand celebration of Lord Krishna's birthday with aarti, bhajan, and prasad distribution.",
  },
  {
    id: 2,
    title: "Diwali Aarti Night",
    date: "Oct 20, 2026",
    time: "7:00 PM",
    image: event2,
    desc: "Festival of lights celebration with special aarti, fireworks, and community feast.",
  },
  {
    id: 3,
    title: "Rath Yatra",
    date: "Jul 10, 2026",
    time: "9:00 AM",
    image: event1,
    desc: "Annual chariot procession through the city with devotional singing.",
  },
  {
    id: 4,
    title: "Guru Purnima",
    date: "Jul 21, 2026",
    time: "5:00 PM",
    image: event2,
    desc: "Honoring the Guru parampara with special pujas and discourses.",
  },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Temple Events</h1>
      <p className="text-muted-foreground mb-8">
        Discover and participate in upcoming celebrations
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((e) => (
          <div
            key={e.id}
            className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
          >
            <img src={e.image} alt={e.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {e.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {e.time}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{e.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{e.desc}</p>
              <Link to={`/events/${e.id}`}>
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