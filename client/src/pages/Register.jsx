import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Flame, Eye, EyeOff } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "You can now sign in.",
      });
      navigate("/login");
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/80 via-background to-secondary/40" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <section className="w-full max-w-md">
          
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-saffron shadow-saffron">
                <Flame className="h-6 w-6 text-primary-foreground" />
              </div>
            </Link>

            <h1 className="font-heading text-3xl font-bold text-foreground">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Join the MyAkshardham community
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <form className="space-y-5" onSubmit={handleSubmit}>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    id="fname"
                    placeholder="Raj"
                    className="mt-1.5"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    id="lname"
                    placeholder="Patel"
                    className="mt-1.5"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="mt-1.5"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="role">Register As</Label>

                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="mt-1.5" id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full gradient-saffron text-primary-foreground shadow-saffron"
                size="lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </section>
 
      </main>
    </div>
  );
}