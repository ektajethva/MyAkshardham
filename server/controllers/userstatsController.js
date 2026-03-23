const supabase = require("../config/supabaseClient")

const getUserDashboardStats = async (req,res) => {
    const { user_id } = req.params;

    try {
    // 1. Temple Visits
    const { count: visits } = await supabase
      .from("visit_booking")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    // 2. Seva Bookings
    const { count: seva } = await supabase
      .from("seva_aarti_booking")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    // 3. Events Joined
    const { count: events } = await supabase
      .from("event_participant")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    // 4. Orders (payments table)
    const { count: orders } = await supabase
      .from("payments")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    res.json({
      visits,
      seva,
      events,
      orders
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
}

const getCrowdStatus = async  ( req,res ) => {
   const { date } = req.params;

  try {
    // 1. Visit bookings count
    const { count: visits } = await supabase
      .from("visit_booking")
      .select("*", { count: "exact", head: true })
      .eq("visit_date", date);

    // 2. Event participants count (JOIN with events)
    const { data: eventsData, error } = await supabase
      .from("event_participant")
      .select(`
        participant_id,
        events:event_id (event_date)
      `)
      .eq("events.date", date);

    const eventCount = eventsData?.length || 0;

    const total = (visits || 0) + eventCount;

    // 3. Decide level
    let level = "Low";
    if (total > 10) level = "High";
    else if (total > 5) level = "Medium";

    const { data: existing } = await supabase
      .from("crowd")
      .select("crowd_id")
      .eq("visit_date", date)
      .single();

    if (existing) {
      // UPDATE
      await supabase
        .from("crowd")
        .update({
          total_people: total,
          last_updated: new Date()
        })
        .eq("visit_date", date);
    } else {
      // INSERT
      await supabase
        .from("crowd")
        .insert({
          visit_date: date,
          total_people: total,
          last_updated: new Date()
        });
    }

    res.json({
      total,
      level,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching crowd status" });
  }
}

module.exports = { getUserDashboardStats , getCrowdStatus}