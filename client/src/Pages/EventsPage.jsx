import { Link } from "react-router-dom";
import { Clock, Calendar } from "lucide-react";
import "./EventsPage.css";

import event1 from "../assets/garden.jpg";
import event2 from "../assets/mandir.jpg";

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

function EventsPage() {
  return (
    <div className="events-container">
      <h1 className="events-title">Temple Events</h1>
      <p className="events-subtitle">
        Discover and participate in upcoming celebrations
      </p>

      <div className="events-grid">
        {events.map((e) => (
          <div key={e.id} className="event-card">
            <img src={e.image} alt={e.title} className="event-image" />

            <div className="event-content">
              <div className="event-meta">
                <span>
                  <Calendar size={14} /> {e.date}
                </span>

                <span>
                  <Clock size={14} /> {e.time}
                </span>
              </div>

              <h3 className="event-title">{e.title}</h3>

              <p className="event-desc">{e.desc}</p>

              <Link to={`/events/${e.id}`} className="event-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;