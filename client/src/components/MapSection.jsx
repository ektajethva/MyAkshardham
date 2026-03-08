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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.0306861234726!2d72.795130173884!3d21.270252879443003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04baaa311317d%3A0xe52667cc15af4c58!2sSwaminarayan%20Akshardham!5e0!3m2!1sen!2sin!4v1772897717139!5m2!1sen!2sin"
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
                  Olpad Road, Kanad Akshardham, Surat, Gujrat. 395004
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