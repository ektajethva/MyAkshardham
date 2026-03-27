import { Link } from "react-router-dom";
import { Calendar, Flame, Car, MapPin, Ticket, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const actions = [
  { label: "Book Visit", path: "/book-visit", icon: Calendar },
  { label: "Book Seva", path: "/seva", icon: Flame },
  { label: "Book Parking", path: "/parking", icon: Car },
  { label: "Tour Guide", path: "/tour-guide", icon: MapPin },
  { label: "My Orders", path: "/orders", icon: ShoppingCart },
  { label: "View Events", path: "/events", icon: Ticket },
];

export default function UserDashboard() {

  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [activeType, setActiveType] = useState(null);
  const [bookingData, setBookingData] = useState([]);

  const [statsData, setStatsData] = useState({
    visits: 0,
    seva: 0,
    events: 0,
    orders: 0
  });

  const stats = [
    { label: "Temple Visits", value: statsData?.visits ?? 0, icon: MapPin },
    { label: "Seva Booked", value: statsData?.seva ?? 0, icon: Flame },
    { label: "Events Joined", value: statsData?.events ?? 0 , icon: Calendar },
    { label: "Orders", value: statsData?.orders ?? 0 , icon: ShoppingCart },
  ];

  const bookingTypes = [
    { label: "Visit Booking", type: "visit" },
    { label: "Seva Booking", type: "seva" },
    { label: "Parking Booking", type: "parking" },
    { label: "Tour Guide", type: "tour" },
  ];

  // ✅ Fetch user (name + profile image)
  const fetchUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await axios.get(
        `http://localhost:5000/auth/getUser/${user.user_id}`
      );

      console.log("USER DATA:", res.data);

      setName(res.data.name);
      setProfileImage(res.data.image);

    } catch (err) {
      console.log("User fetch error:", err);
    }
  };

  // ✅ Fetch stats
  const fetchStats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await axios.get(
        `http://localhost:5000/user/dashboard/${user.user_id}`
      );

      setStatsData(res.data);

    } catch (error) {
      console.log("Failed to load stats", error);
    }
  };

  // ✅ Fetch bookings
  const fetchBookingsByType = async (type) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:5000/booking/userBooking/${type}/${user.user_id}`
      );

      const formatted = res.data.map((b) => ({
        id: b.id,
        date:
          b.visit_date ||
          b.seva_date ||
          b.parking_date ||
          b.booking_date,
        status: b.status,
      }));

      setBookingData(formatted);
      setActiveType(type);

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Load everything
  useEffect(() => {
    fetchUser();
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen  bg-gray-100">
      <div className="container mx-auto px-4 py-8">

        {/* ✅ Welcome */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-6 mb-8 text-white shadow-xl flex items-center justify-between">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {name}
            </h1>
            <p className="opacity-90 mt-1">
              Here’s a quick overview of your bookings and activities.
            </p>
          </div>

          {/* ✅ Profile Image from DB */}
          <img
            src={profileImage || "https://i.pravatar.cc/100"}
            alt="profile"
            className="h-14 w-14 md:h-16 md:w-16 rounded-full border-2 border-white object-cover"
          />

        </div>

        

        {/* ✅ Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition border-t-4 border-orange-400"
              >
                <Icon className="h-6 w-6 text-orange-500 mb-2" />

                <div className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </div>

                <div className="text-sm text-gray-500">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Bookings */}
        <div className="bg-gray-50 rounded-2xl p-5 shadow-md mb-8 border border-orange-200">
          <h2 className="text-lg font-semibold mb-4">My Bookings</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {bookingTypes.map((b) => (
              <button
                key={b.type}
                onClick={() => fetchBookingsByType(b.type)}
                className={`p-3 rounded-lg text-sm font-medium border transition-all
                ${
                  activeType === b.type
                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                    : "bg-white text-gray-600 border-orange-100 hover:bg-orange-50"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {activeType && (
            <div className="mt-4">
              {bookingData.length === 0 ? (
                <p className="text-gray-500 text-sm">No bookings found</p>
              ) : (
                <div className="space-y-3">
                  {bookingData.map((b, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-orange-50/90 rounded-lg p-3 border-l-4 border-orange-400"
                    >
                      <div>
                        <p className="font-medium capitalize">
                          {activeType} Booking
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(b.date).toLocaleDateString("en-IN")}
                        </p>
                      </div>

                      <span className={`text-xs px-2 py-1 rounded-full ${
                        b.status === "Confirmed"
                          ? "bg-green-50 text-green-600"
                          : b.status === "Pending"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-red-50 text-red-600"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ✅ Quick Actions */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} to={action.path}>
                <div className="bg-white border border-orange-100 rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center gap-3 text-center">

                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-orange-600" />
                  </div>

                  <span className="font-medium text-sm text-gray-700">
                    {action.label}
                  </span>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}