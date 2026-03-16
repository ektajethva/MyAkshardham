import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "../hooks/use-toast";
import { Save } from "lucide-react";

export default function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      })
      .eq("user_id", user.id);

    setIsSaving(false);

    if (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    await refreshProfile();
    toast({ title: "Profile updated!" });
  };

  if (loading) return null;

  const initials =
    `${(firstName || "")[0] || ""}${(lastName || "")[0] || ""}`.toUpperCase() ||
    "U";

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <Card className="border-border shadow-card">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <CardTitle className="font-heading text-2xl">
            Edit Profile
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            {user?.email}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSave}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  className="mt-1.5"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Raj"
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  className="mt-1.5"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Patel"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                className="mt-1.5"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ""} disabled />
              <p className="text-xs text-muted-foreground mt-1">
                Email cannot be changed
              </p>
            </div>

            <Button
              type="submit"
              className="w-full gradient-saffron text-primary-foreground shadow-saffron hover:opacity-90"
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}