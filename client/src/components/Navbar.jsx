import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Flame, ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../contexts/CartContext";
import { supabase } from "../lib/supabaseClient";

const navLinks = [
  // { label: "Home", path: "/" },
  // { label: "Events", path: "/events" },
  // { label: "Seva", path: "/seva" },
  { label: "Shop", path: "/shop" },
  { label: "Crowd Status", path: "/crowd-status" },
  { label: "Donate", path: "/donation" },
  { label: "Tour Guide", path: "/tour-guide" },
];

export default function Navbar() {

  const [user, setUser] = useState(null);
  const [dropdownmenu, setDropdownmenu] = useState(false);

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  const token = params.get("token");
  const name = params.get("name");
  const email = params.get("email");

  // Google login via backend redirect
  if (token) {

    const userData = { name, email, role:"user" };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

    window.history.replaceState({}, document.title, "/");

  } else {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 👇 detect Supabase Google login
    const checkGoogleUser = async () => {
      const { data } = await supabase.auth.getUser();

      const user = data.user;

      if (user) {
        const userData = {
          name: user.user_metadata.full_name,
          email: user.email,
          role:"user"
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }
    };

    checkGoogleUser();
  }

}, [location]);

  const handleLogout = async () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    await supabase.auth.signOut();

    setUser(null);

    window.location.href = "/";
  }
  

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <Flame className="h-7 w-7 text-primary" />
          <span className="font-heading text-xl font-bold text-foreground">
            My<span className="text-primary">Akshardham</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === l.path
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* CART ICON */}
          <Link to="/cart" className="relative ml-2">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* LOGIN BUTTON  & User Namer Shown */}
          {user && user.role !== "admin" ?(
           <div className="relative ml-3">

    {/* Avatar */}
    <div
      onClick={() => setDropdownmenu(!dropdownmenu)}
      className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold cursor-pointer hover:shadow-md transition"
    >
      {user.name?.charAt(0).toUpperCase()}
    </div>

    {/* Dropdown */}
    {dropdownmenu && (
      <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-200">

        {/* Profile Section */}
        <div className="flex flex-col items-center p-6 border-b">

          <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-2">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <p className="text-sm font-semibold text-gray-900">
            {user.name}
          </p>

          <p className="text-xs text-gray-500">
            {user.email}
          </p>

        </div>

        {/* Menu Section */}
        <div className="py-2">

          <Link
            to="/dashboard"
            className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            to="/orders"
            className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Orders
          </Link>

          <Link
            to="/settings"
            className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </Link>

        </div>

        {/* Logout Section */}
        <div className="border-t p-3">

          <button
            onClick={handleLogout}
            className="w-full border rounded-full py-2 text-sm hover:bg-gray-100 transition"
          >
            Sign out
          </button>

        </div>

      </div>
    )}

  </div>

          ): (
          <Link to="/login">
            <Button variant="outline" size="sm" className="ml-1">
              Login
            </Button>
          </Link>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <div className="flex flex-col px-4 pb-4 gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === l.path
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <Link
              to="/login"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
}