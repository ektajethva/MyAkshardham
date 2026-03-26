import { Calendar, Clock, ArrowLeft, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import event1 from "../assets/event-1.jpg";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useState, useEffect } from "react";
import { toast } from "../hooks/use-toast";
import axios from "axios";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  event_id: "",
  user_id: "",
};

export default function EventDetailsPage() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [participantForm, setParticipantForm] = useState({
    name: "",
    email: "",
    phone: "",
    event_id: id,
    user_id: user?.id || null,
    photo: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`http://localhost:5000/Event/get/${id}`);
      const data = await res.json();
      setEvent(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load event. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Update user_id when user changes
    if (user?.id) {
      setParticipantForm((prev) => ({
        ...prev,
        user_id: user.id,
      }));
    }
  }, [user?.id]);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleParticipantSubmit = async (e) => {
    e.preventDefault();

    if (!participantForm.name || !participantForm.email || !participantForm.phone) {
      toast({
        title: "Error",
        description: "Event name and date are required.",
        variant: "destructive",
      });
      return;
    }

    const payload = {    
      name: participantForm.name,
      email: participantForm.email,
      phone: participantForm.phone,
      event_id: id,
      user_id: user.user_id || null,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/Event/participate",
        payload
      );

      if (res.status === 200) {
        toast({ title: res.data.message || "Registered successfully" });

        setParticipantForm({
          name: "",
          email: "",
          phone: "",
          event_id: id,
          user_id: user?.user_id || null,
        });

        setShowForm(false);
      }

    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to register for event",
        variant: "destructive",
      });
    }
    };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingId(null);
    setParticipantForm({
      name: "",
      email: "",
      phone: "",
      event_id: id,
      user_id: user.user_id || null,
      
    });
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        to="/events"
        className="text-primary text-sm flex items-center gap-1 mb-4 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </Link>

      {showForm && (
        <div className="bg-card rounded-xl shadow-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">
              {editingId ? "Edit Participant" : "Register for Event"}
            </h2>
            <Button variant="ghost" size="sm" onClick={cancelEdit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleParticipantSubmit}
          >
            <div>
              <Label>Name *</Label>
              <Input
                placeholder="Enter your name"
                className="mt-1"
                value={participantForm.name}
                onChange={(e) =>
                  setParticipantForm({ ...participantForm, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="mt-1"
                value={participantForm.email}
                onChange={(e) =>
                  setParticipantForm({ ...participantForm, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
              type="tel"
                placeholder="Enter phone number"
                className="mt-1"
                value={participantForm.phone}
                onChange={(e) =>
                  setParticipantForm({ ...participantForm, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">
                {editingId ? "Update" : "Register"}
              </Button>
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <img
        src={event.image_url || event1}
        alt="Event"
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" /> {event.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" /> {event.time}
        </span>
      </div>

      <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
        {event.name}
      </h1>

      <p className="text-muted-foreground leading-relaxed mb-6">
        {event.description}
      </p>

      <p className="text-foreground mb-6">
        Location: {event.place || "Akshardham"}
      </p>

      <Button size="lg" onClick={() => setShowForm(true)}>
        Participate
      </Button>
    </div>
  );
}