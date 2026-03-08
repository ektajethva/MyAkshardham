import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Flame, ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../contexts/CartContext";

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
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

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

          {/* LOGIN BUTTON */}
          <Link to="/login">
            <Button variant="outline" size="sm" className="ml-1">
              Login
            </Button>
          </Link>
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