import { MapPin, Clock, Phone } from "lucide-react";
import "./MapSection.css";

function MapSection() {
  return (
    <section className="map-section">
      <div className="map-container">

        <div className="map-header">
          <h2>Find Us</h2>
          <p>Visit us at Swaminarayan Akshardham, Surat</p>
        </div>

        <div className="map-grid">

          {/* Google Map */}
          <div className="map-frame">
            <iframe
              title="Temple Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.0306861234726!2d72.79513017388406!3d21.270252879443003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04baaa311317d%3A0xe52667cc15af4c58!2sSwaminarayan%20Akshardham!5e0!3m2!1sen!2sin!4v1772364755871!5m2!1sen!2sin"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          {/* Info Cards */}
          <div className="map-info">

            <div className="info-card">
              <div className="info-icon">
                <MapPin size={20} />
              </div>
              <div>
                <h4>Address</h4>
                <p>Olpad Road, Kanad, Surat, Gujarat 395004</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Clock size={20} />
              </div>
              <div>
                <h4>Visiting Hours</h4>
                <p>Tue – Sun: 9:00 AM – 7:30 PM</p>
                <p>Monday: Closed</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Phone size={20} />
              </div>
              <div>
                <h4>Contact</h4>
                <p>+91 98765 43210</p>
                <p>info@myakshardham.org</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default MapSection;