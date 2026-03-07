import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Index";
import RegisterPage from "./pages/Register";
import UserLayout from "./components/UserLayout";
import UserDashboard from "./pages/UserDashboard";
import BookVisitPage from "./pages/BookVisit";
import BookingConfirmation from "./pages/BookingConfirmation";
import EventsPage from "./pages/Events";
import EventDetailsPage from "./pages/EventDetails";
import SevaPage from "./pages/Seva";
import ShopPage from "./pages/Shop";
import CartPage from "./pages/Cart";
import MyOrdersPage from "./pages/MyOrders";
import TourGuidePage from "./pages/TourGuidePage";
import ParkingPage from "./pages/Parking";
import CrowdStatusPage from "./pages/CrowdStatus";
import DonationPage from "./pages/Donation";



const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* User routes */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/book-visit" element={<BookVisitPage />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="/seva" element={<SevaPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<MyOrdersPage />} />
              <Route path="/tour-guide" element={<TourGuidePage />} />
              <Route path="/parking" element={<ParkingPage />} />
              <Route path="/crowd-status" element={<CrowdStatusPage />} />
              <Route path="/donation" element={<DonationPage />} />
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

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;