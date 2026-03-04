import { Link } from "react-router-dom";
import { Calendar, Flame, Car, Users, Clock, ArrowRight } from "lucide-react";
import templeHero from "../assets/mandir.jpg";
import event1 from "../assets/garden.jpg";
import event2 from "../assets/exhibition.jpg";
import "./HomePage.css";
import MapSection from "../Components/MapSection";

const quickActions = [
  { label: "Book Visit", icon: Calendar, path: "/book-visit", className: "saffron" },
  { label: "Seva & Aarti", icon: Flame, path: "/seva", className: "gold" },
  { label: "Events", icon: Users, path: "/events", className: "saffron" },
  { label: "Parking", icon: Car, path: "/parking", className: "gold" },
];

const upcomingEvents = [
  { title: "Janmashtami Celebration", date: "Aug 15, 2026", image: event1 },
  { title: "Diwali Aarti Night", date: "Oct 20, 2026", image: event2 },
];

function HomePage() {
  return (
    <div>

      {/* ===== HERO ===== */}
      <section className="hero">
        <img src={templeHero} alt="Temple" className="hero-img" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Welcome to MyAkshardham</h1>
          <p>
            Experience divine peace, devotion, and community at the Swaminarayan Temple
          </p>

          <div className="hero-buttons">
            <Link to="/book-visit">
              <button className="primary-btn">Book a Visit</button>
            </Link>

            <Link to="/events">
              <button className="outline-btn">
                View Events
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUICK ACTIONS ===== */}
      <section className="quick-section">
        <div className="quick-grid">
          {quickActions.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`quick-card ${item.className}`}
            >
              <item.icon className="quick-icon" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about-section">
        <h2>About MyAkshardham</h2>
        <p>
          MyAkshardham is a temple management platform designed to enhance
          spiritual experience. Book visits, participate in seva, explore events
          and more — all in one place.
        </p>
      </section>

      {/* ===== LIVE CROWD ===== */}
      <section className="crowd-section">
        <h2 >Live Crowd Status</h2>
        <div className="crowd-box">
          <div className="pulse-dot" />
          <span>Low Crowd — Best time to visit!</span>
        </div>
      </section>

      {/* ===== EVENTS ===== */}
      <section className="events-section">
        <div className="events-header">
          <h2>Upcoming Events</h2>
          <Link to="/events" className="view-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="events-grid">
          {upcomingEvents.map((e) => (
            <div key={e.title} className="event-card">
              <img src={e.image} alt={e.title} />
              <div className="event-content">
                <div className="event-date">
                  <Clock size={14} />
                  {e.date}
                </div>
                <h3>{e.title}</h3>

                <Link to="/events">
                  <button className="outline-btn small-btn">
                    View Details
                  </button>
                </Link>

              </div>
            </div>
          ))}
        </div>
      </section>
      <MapSection></MapSection>

    </div>
  );
}

export default HomePage;