import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Pencil, Trash2, X, Star, Globe } from "lucide-react";
import { useState, useEffect } from "react";
// import { supabase } from "../../../integrations/supabase/client";
import { toast } from "../../hooks/use-toast";

const emptyForm = {
  name: "",
  photo_url: "",
  bio: "",
  languages: "",
  rating: "4.5",
};

export default function ManageGuides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchGuides = async () => {
    const { data } = await supabase
      .from("guides")
      .select("*")
      .order("created_at", { ascending: false });

    setGuides(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      toast({
        title: "Error",
        description: "Guide name is required.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name: form.name,
      photo_url: form.photo_url,
      bio: form.bio,
      languages: form.languages,
      rating: parseFloat(form.rating) || 4.5,
    };

    if (editingId) {
      const { error } = await supabase
        .from("guides")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast({
          title: "Failed to update guide",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Guide updated successfully" });
      }
    } else {
      const { error } = await supabase.from("guides").insert(payload);

      if (error) {
        toast({
          title: "Failed to add guide",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Guide added successfully" });
      }
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    fetchGuides();
  };

  const handleEdit = (g) => {
    setForm({
      name: g.name,
      photo_url: g.photo_url || "",
      bio: g.bio || "",
      languages: g.languages || "",
      rating: String(g.rating || 4.5),
    });

    setEditingId(g.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("guides").delete().eq("id", id);

    if (error) {
      toast({
        title: "Failed to delete guide",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Guide deleted" });
      fetchGuides();
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
          Manage Tour Guides
        </h1>

        {!showForm && (
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add Guide
          </Button>
        )}
      </div>

      {showForm && (
        <div className="bg-card rounded-xl shadow-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">
              {editingId ? "Edit Guide" : "Add New Guide"}
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
              <Label>Guide Name *</Label>
              <Input
                placeholder="e.g. Pandit Ramesh Sharma"
                className="mt-1"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Photo URL</Label>
              <Input
                placeholder="https://example.com/photo.jpg"
                className="mt-1"
                value={form.photo_url}
                onChange={(e) =>
                  setForm({ ...form, photo_url: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Languages (comma separated)</Label>
              <Input
                placeholder="e.g. Hindi, English, Gujarati"
                className="mt-1"
                value={form.languages}
                onChange={(e) =>
                  setForm({ ...form, languages: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Rating (1-5)</Label>
              <Input
                type="number"
                step="0.1"
                min="1"
                max="5"
                className="mt-1"
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label>Bio</Label>
              <Textarea
                placeholder="Describe the guide's experience..."
                className="mt-1"
                rows={3}
                value={form.bio}
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">
                {editingId ? "Update Guide" : "Add Guide"}
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
        <p className="text-muted-foreground">Loading guides...</p>
      ) : guides.length === 0 ? (
        <p className="text-muted-foreground">
          No guides yet. Add your first guide!
        </p>
      ) : (
        <div className="bg-card rounded-xl shadow-card divide-y divide-border">
          {guides.map((g) => (
            <div
              key={g.id}
              className="flex items-start justify-between p-4 gap-4"
            >
              {g.photo_url && (
                <img
                  src={g.photo_url}
                  alt={g.name}
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />
              )}

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{g.name}</p>

                {g.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {g.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {g.rating}
                  </span>

                  {g.languages && (
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {g.languages}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(g)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleDelete(g.id)}
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