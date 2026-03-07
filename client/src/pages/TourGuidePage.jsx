import { Card, CardContent } from "../components/ui/card";
import { Star, Globe, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";

const guides = [
  {
    name: "Pandit Ramesh Sharma",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Expert in Swaminarayan history with 15+ years of guiding experience at major temples across Gujarat.",
    languages: ["Hindi", "English", "Gujarati"],
    rating: 4.9,
  },
  {
    name: "Meera Patel",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "Passionate storyteller who brings temple architecture and spiritual significance to life for visitors.",
    languages: ["English", "Gujarati"],
    rating: 4.8,
  },
  {
    name: "Arjun Desai",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "Multilingual guide specializing in cultural heritage tours and family-friendly experiences.",
    languages: ["Hindi", "English", "Marathi", "Gujarati"],
    rating: 4.7,
  },
  {
    name: "Kavita Joshi",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Certified heritage guide with deep knowledge of Vedic art, sculptures, and temple rituals.",
    languages: ["Hindi", "English"],
    rating: 4.9,
  },
];

export default function TourGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Our Tour Guides
        </h1>

        <p className="text-muted-foreground max-w-xl mx-auto">
          Explore the temple with our experienced guides who bring history,
          art, and spirituality to life.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {guides.map((guide) => (
          <Card
            key={guide.name}
            className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              
              <img
                src={guide.photo}
                alt={guide.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-secondary mb-4 group-hover:ring-primary/30 transition-all"
              />

              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                {guide.name}
              </h3>

              <div className="flex items-center gap-1 text-sm text-primary mb-3">
                <Star className="h-4 w-4 fill-primary" />
                <span className="font-medium">{guide.rating}</span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {guide.bio}
              </p>

              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-5 flex-wrap justify-center">
                <Globe className="h-3.5 w-3.5 mr-1" />
                {guide.languages.join(" · ")}
              </div>

              <Button className="w-full" size="sm">
                <MapPin className="h-4 w-4 mr-1" />
                Book Now
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}