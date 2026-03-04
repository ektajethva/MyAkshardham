import "./TourGuidePage.css";
import { Star, Globe, MapPin } from "lucide-react";

const guides = [
  {
    name: "Pandit Ramesh Sharma",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Expert in Swaminarayan history with 15+ years of experience.",
    languages: ["Hindi", "English", "Gujarati"],
    rating: 4.9,
  },
  {
    name: "Meera Patel",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "Passionate storyteller about temple architecture and spirituality.",
    languages: ["English", "Gujarati"],
    rating: 4.8,
  },
  {
    name: "Arjun Desai",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "Multilingual guide for cultural heritage tours.",
    languages: ["Hindi", "English", "Marathi", "Gujarati"],
    rating: 4.7,
  },
  {
    name: "Kavita Joshi",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Knowledge of Vedic art, sculptures and rituals.",
    languages: ["Hindi", "English"],
    rating: 4.9,
  },
];

function TourGuidePage() {

  const handleBook = (name) => {
    alert(`Tour booked with ${name} ✅`);
  };

  return (
    <div className="guide-container">

      <div className="guide-header">
        <h1>Our Tour Guides</h1>
        <p>
          Explore the temple with experienced guides who bring history and spirituality to life.
        </p>
      </div>

      <div className="guide-grid">

        {guides.map((g) => (
          <div key={g.name} className="guide-card">

            <img src={g.photo} alt={g.name} className="guide-photo" />

            <h3 className="guide-name">{g.name}</h3>

            <div className="guide-rating">
              <Star size={14} />
              <span>{g.rating}</span>
            </div>

            <p className="guide-bio">{g.bio}</p>

            <div className="guide-languages">
              <Globe size={14} />
              <span>{g.languages.join(" · ")}</span>
            </div>

            <button
              className="guide-btn"
              onClick={() => handleBook(g.name)}
            >
              <MapPin size={16} />
              Book Now
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TourGuidePage;