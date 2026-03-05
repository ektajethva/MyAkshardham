import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import HomePage from "./Pages/HomePage";
import EventsPage from "./Pages/EventsPage";
import ShopPage from "./Pages/ShopPage";
import CrowdStatusPage from "./Pages/CrowdStatusPage";
import DonationPage from "./Pages/DonationPage";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

import ChatWidget from "./Components/ChatWidget";
import TourGuidePage from "./Pages/TourGuidePage";
import  User  from "./Pages/User";
import BookVisitPage from "./Pages/BookVisitPage";
import ParkingPage from "./Pages/ParkingPage";
import MyOrdersPage from "./Pages/MyOrdersPage";
import BookingConfirmation from "./Pages/BookingConfirmation";
import CartPage from "./Pages/CartPage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageCrowd from "./Pages/Admin/ManageCrowd";
import ManageDonations from "./Pages/Admin/ManageDonations";
import ManageEvents from "./Pages/Admin/ManageEvents";
import ManageProducts from "./Pages/Admin/ManageProducts";
import ViewBookings from "./Pages/Admin/ViewBookings";
import ViewOrders from "./Pages/Admin/ViewOrders";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const location = useLocation();

  // Pages where Navbar & Footer hide karvu che
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <HomePage /> : <Navigate to="/register" />
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/events"
          element={
            isLoggedIn ? <EventsPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/shop"
          element={
            isLoggedIn ? <ShopPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/crowd-status"
          element={
            isLoggedIn ? <CrowdStatusPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/donation"
          element={
            isLoggedIn ? <DonationPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/Tour-Guide"
          element={
            isLoggedIn ? <TourGuidePage /> : <Navigate to="/Tour-Guide" />
          }
        />
        <Route
          path="/User"
          element={
            isLoggedIn ? <User /> : <Navigate to="/User" />
          }
        />
        <Route
          path="/Book-Visit"
          element={
            isLoggedIn ? <BookVisitPage /> : <Navigate to="/Book-Visit" />
          }
        />
        <Route
          path="/Parking"
          element={
            isLoggedIn ? <ParkingPage /> : <Navigate to="/Parking" />
          }
        />
        <Route
          path="/Orders"
          element={
            isLoggedIn ? <MyOrdersPage /> : <Navigate to="/Orders" />
          }
        />
        <Route
          path="/Booking-Confirmation"
          element={
            isLoggedIn ? <BookingConfirmation /> : <Navigate to="/Booking-Confirmation" />
          }
        />
        <Route
          path="/cart"
          element={
            isLoggedIn ? <CartPage /> : <Navigate to="/cart" />
          }
        />
        <Route
          path="/Admin-dashboard"
          element={
            isLoggedIn ? <AdminDashboard /> : <Navigate to="/Admin-dashboard" />
          }
        />
        <Route
          path="/managecrowd"
          element={
            isLoggedIn ? <ManageCrowd /> : <Navigate to="/managecrowd" />
          }
        />
        <Route
          path="/managedonation"
          element={
            isLoggedIn ? <ManageDonations /> : <Navigate to="/managedonation" />
          }
        />
        <Route
          path="/manage-events"
          element={
            isLoggedIn ? <ManageEvents /> : <Navigate to="/manage-events" />
          }
        />
        <Route
          path="/manage-products"
          element={
            isLoggedIn ? <ManageProducts /> : <Navigate to="/manage-products" />
          }
        />
        <Route
          path="/view-booking"
          element={
            isLoggedIn ? <ViewBookings /> : <Navigate to="/view-booking" />
          }
        />
        <Route
          path="/view-Orders"
          element={
            isLoggedIn ? <ViewOrders /> : <Navigate to="/view-orders" />
          }
        />
        
      </Routes>

      {!hideLayout && <ChatWidget />}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;