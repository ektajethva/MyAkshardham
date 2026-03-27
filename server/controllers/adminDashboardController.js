const supabase = require("../config/supabaseClient")

const getDashboardStats = async ( req , res ) => {
  try {
    // ✅ 1. Total Users
    const { count: usersCount, error: userError } = await supabase
      .from("users")
      .select("*", { count: "exact" });

    // ✅ 2. Total Bookings
    const { count: bookingCount, error: bookingError } = await supabase
      .from("visit_booking")
      .select("*", { count: "exact" });

    // ✅ 3. Total Events
    const { count: eventCount, error: eventError } = await supabase
      .from("events")
      .select("*", { count: "exact" });

    // ✅ 4. Revenue (sum of donors)
    const { data: revenueData, error: revenueError } = await supabase
      .from("donors")
      .select("amount");

    const totalRevenue = revenueData?.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    if (userError || bookingError || eventError || revenueError) {
      return res.status(400).json({ error: "Error fetching stats" });
    }

    res.json({
      total_users: usersCount,
      total_bookings: bookingCount,
      total_events: eventCount,
      revenue: totalRevenue,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getRecentBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("visit_booking")
      .select("*")
      .order("visit_date", { ascending: false })
      .limit(5);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDashboardStats , getRecentBookings}