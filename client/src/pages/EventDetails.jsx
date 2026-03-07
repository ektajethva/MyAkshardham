import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import event1 from "../assets/event-1.jpg";
import { Button } from "../components/ui/button";

export default function EventDetailsPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        to="/events"
        className="text-primary text-sm flex items-center gap-1 mb-4 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </Link>

      <img
        src={event1}
        alt="Event"
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" /> Aug 15, 2026
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" /> 6:00 PM
        </span>
      </div>

      <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
        Janmashtami Celebration
      </h1>

      <p className="text-muted-foreground leading-relaxed mb-6">
        Join us for the grand celebration of Lord Krishna's birthday. The event
        includes special aarti, devotional bhajans, cultural performances, and
        prasad distribution. All devotees and families are welcome. Dress code:
        Traditional attire preferred.
      </p>

      <Button size="lg">Participate</Button>
    </div>
  );
}