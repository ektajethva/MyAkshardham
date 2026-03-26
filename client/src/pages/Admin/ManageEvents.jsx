import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Pencil, Trash2, X, Calendar, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { toast } from "../../hooks/use-toast";
import axios from "axios";

const emptyForm = {
  name: "",
  description: "",
  date: "",
  time: "",
  image_url: "",
  place: "",
};

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
     try {
      const res = await fetch("http://localhost:5000/Event/getEvents");
      const data = await res.json();
        console.log(data);
      setEvents(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

    const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.date) {
      toast({
        title: "Error",
        description: "Event name and date are required.",
        variant: "destructive",
      });
      return;
    }

    const payload = {    
      name: form.name,
      description: form.description,
      date: form.date,
      time: form.time,
      image_url: form.image_url,
      place: form.place,
    };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/Event/updateEvent/${editingId}`,
           payload
        );
       
        toast({ title: "Event updated successfully" });
      } 
      else {
        await axios.post(
          "http://localhost:5000/Event/addEvent",
           payload
        );
        toast({ title: "Event added successfully" });
      }    
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
        fetchEvents();
    }
    catch (error) {
      console.log(error);
      
        toast({
          title: "Error",
          description: "Failed to save event. Please try again.",
          variant: "destructive",
        });
      }
    };


  const handleEdit = (event) => {
    console.log("Editing event:", event);
    setForm({
      name: event.name,
      description: event.description || "",
      date: event.date,
      time: event.time || "",
      image_url: event.image_url || "",
      place: event.place || "",
    });

    setEditingId(event.event_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/Event/deleteEvent/${id}`);
      toast({ title: "Event deleted successfully" });
      fetchEvents();
    }
    catch (error) {
      console.log(error);
      
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Manage Events
        </h1>

        {!showForm && (
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add Event
          </Button>
        )}
      </div>

      {showForm && (
        <div className="bg-card rounded-xl shadow-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">
              {editingId ? "Edit Event" : "Add New Event"}
            </h2>

            <Button variant="ghost" size="sm" onClick={cancelEdit}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <Label>Event Name *</Label>
              <Input
                placeholder="e.g. Janmashtami Celebration"
                className="mt-1"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Date *</Label>
              <Input
                type="date"
                className="mt-1"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Time</Label>
              <Input
                type="time"
                className="mt-1"
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Place (optional)</Label>
              <Input
                placeholder="e.g. Main Temple Hall"
                className="mt-1"
                value={form.place}
                onChange={(e) =>
                  setForm({ ...form, place: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Image URL</Label>
              <Input
                placeholder="https://example.com/image.jpg"
                className="mt-1"
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe the event..."
                className="mt-1"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">
                {editingId ? "Update Event" : "Add Event"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      {loading ? (
        <p className="text-muted-foreground">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-muted-foreground">
          No events yet. Add your first event!
        </p>
      ) : (
        <div className="bg-card rounded-xl shadow-card divide-y divide-border">
          {events.map((e) => (
            <div
              key={e.event_id}
              className="flex items-start justify-between p-4 gap-4"
            >
              {e.image_url && (
                <img
                  src={e.image_url}
                  alt={e.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
              )}

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{e.name}</p>

                {e.description && (
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {e.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {e.date}
                    {e.time ? ` • ${e.time}` : ""}
                  </span>

                  {e.place && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {e.place}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(e)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleDelete(e.event_id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}