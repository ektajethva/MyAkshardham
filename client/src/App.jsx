import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import BookVisit from "./pages/BookVisit";
import BookingConfirmation from "./pages/BookingConfirmation";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Seva from "./pages/Seva";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import TourGuide from "./pages/TourGuide";
import Parking from "./pages/Parking";
import CrowdStatus from "./pages/CrowdStatus";
import Donation from "./pages/Donation";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageProducts from "./pages/admin/ManageProducts";
import ViewBookings from "./pages/admin/ViewBookings";
import ManageCrowd from "./pages/admin/ManageCrowd";
import ViewOrders from "./pages/admin/ViewOrders";
import ManageDonations from "./pages/admin/ManageDonations";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User routes */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/book-visit" element={<BookVisit />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/seva" element={<Seva />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/tour-guide" element={<TourGuide />} />
              <Route path="/parking" element={<Parking />} />
              <Route path="/crowd-status" element={<CrowdStatus />} />
              <Route path="/donation" element={<Donation />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="events" element={<ManageEvents />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="bookings" element={<ViewBookings />} />
              <Route path="crowd" element={<ManageCrowd />} />
              <Route path="orders" element={<ViewOrders />} />
              <Route path="donations" element={<ManageDonations />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;