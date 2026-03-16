import { Flame, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Logo2 from "../assets/logo2.png"; // <-- import your logo from assets

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <Flame className="h-6 w-6 text-primary" /> */}
              <img
                src={Logo2}        // logo image
                alt="Akshardham Logo" 
                className="h-12 w-35"
              />
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              A divine destination for spiritual growth, devotion, and community service in the Swaminarayan tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/events" className="hover:opacity-100 transition-opacity">Events</Link>
              <Link to="/seva" className="hover:opacity-100 transition-opacity">Seva & Aarti</Link>
              <Link to="/shop" className="hover:opacity-100 transition-opacity">Temple Shop</Link>
              <Link to="/book-visit" className="hover:opacity-100 transition-opacity">Book Visit</Link>
              <Link to="/crowd-status" className="hover:opacity-100 transition-opacity">Crowd Status</Link>
              <Link to="/admin/login" className="hover:opacity-100 transition-opacity">Admin Portal</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Olpad Road, Kanad Akshardham, Surat, Gujrat. 395004</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@myakshardham.org</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm opacity-50">
          © 2026 Akshardham. All rights reserved.
        </div>
      </div>
    </footer>
  );
}