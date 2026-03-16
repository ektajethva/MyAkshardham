import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Calendar, Flame, Car, Users, Clock, ArrowRight } from "lucide-react";
import templeHero from "../assets/temple-hero.jpg";
import event1 from "../assets/event-1.jpg";
import event2 from "../assets/event-2.jpg";
import MapSection from "../components/MapSection";

const quickActions = [
  { label: "Book Visit", icon: Calendar, path: "/book-visit", color: "gradient-saffron" },
  { label: "Seva & Aarti", icon: Flame, path: "/seva", color: "gradient-gold" },
  { label: "Events", icon: Users, path: "/events", color: "gradient-saffron" },
  { label: "Parking", icon: Car, path: "/parking", color: "gradient-gold" },
];

const upcomingEvents = [
  { title: "Janmashtami Celebration", date: "Aug 15, 2026", image: event1 },
  { title: "Diwali Aarti Night", date: "Oct 20, 2026", image: event2 },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img src={templeHero} alt="Akshardham Temple" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb- drop-shadow-lg">
            Welcome to Akshardham
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl mb-8 font-light">
            Experience divine peace, devotion, and community at the Swaminarayan Temple
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/book-visit">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-saffron">
                Book a Visit
              </Button>
            </Link>
            <Link to="/events">
              <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                View Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.path}
              className={`${a.color} rounded-xl p-5 text-primary-foreground shadow-saffron hover:scale-105 transition-transform text-center`}
            >
              <a.icon className="h-8 w-8 mx-auto mb-2" />
              <span className="font-semibold text-sm">{a.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold mb-4 text-foreground">About MyAkshardham</h2>
          <p className="text-muted-foreground leading-relaxed">
            MyAkshardham is a comprehensive temple management platform designed to enhance your spiritual journey. 
            Book temple visits, participate in seva and aarti, explore events, and shop for sacred items — all in one place. 
            We strive to bring the divine experience closer to every devotee.
          </p>
        </div>
      </section>

      {/* Live Crowd Status */}
      <section className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">Live Crowd Status</h2>
          <div className="inline-flex items-center gap-3 bg-card rounded-full px-8 py-4 shadow-card">
            <div className="h-4 w-4 rounded-full bg-primary/70 animate-pulse" />
            <span className="font-semibold text-foreground">Low Crowd</span>
            <span className="text-muted-foreground text-sm">— Best time to visit!</span>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">Upcoming Events</h2>
          <Link to="/events" className="text-primary font-medium text-sm flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingEvents.map((e) => (
            <div key={e.title} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
              <img src={e.image} alt={e.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  {e.date}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{e.title}</h3>
                <Link to="/events">
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <MapSection />
    </div>
  );
}