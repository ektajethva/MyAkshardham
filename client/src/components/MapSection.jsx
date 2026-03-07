import { MapPin, Clock, Phone } from "lucide-react";

export default function MapSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
          Find Us
        </h2>
        <p className="text-muted-foreground">
          Visit us at Akshardham Temple, Gandhinagar
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Map */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-card border border-border h-80 md:h-96">
          <iframe
            title="Akshardham Temple Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.6550%2C23.2050%2C72.6750%2C23.2150&layer=mapnik&marker=23.2100%2C72.6650"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>

        {/* Info cards */}
        <div className="flex flex-col gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  Address
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Akshardham Road, Sector 20, Gandhinagar, Gujarat 382421
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  Visiting Hours
                </h4>
                <p className="text-muted-foreground text-sm">
                  Tue – Sun: 9:00 AM – 7:30 PM
                </p>
                <p className="text-muted-foreground text-sm">
                  Monday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  Contact
                </h4>
                <p className="text-muted-foreground text-sm">
                  +91 98765 43210
                </p>
                <p className="text-muted-foreground text-sm">
                  info@myakshardham.org
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}