import { CheckCircle, Download } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function BookingConfirmation() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md text-center">
      <div className="bg-card rounded-2xl shadow-card p-8 animate-fade-in">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-muted-foreground mb-6">
          Your booking has been confirmed. Booking ID:{" "}
          <span className="font-mono font-semibold text-foreground">
            #AKS20260815
          </span>
        </p>

        <div className="bg-secondary rounded-xl p-4 text-left text-sm space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium text-foreground">Aug 15, 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time</span>
            <span className="font-medium text-foreground">10:00 AM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Persons</span>
            <span className="font-medium text-foreground">4</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-1" /> Receipt
          </Button>
          <Link to="/dashboard" className="flex-1">
            <Button className="w-full">Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}