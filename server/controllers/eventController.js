const supabase = require("../config/supabaseClient")

const addEvent = async (req,res) => {
    const { name , description , date , time, image_url, place} = req.body;

    const { data , error } = await supabase
        .from("events")
        .insert([
            {
                name:name,
                description:description,
                date:date,
                time:time,
                image_url:image_url,
                place:place
            }
        ])
    
    if(error){
        return res.status(500).json(error);
    }

    res.json({message:"event added",data})
}


const updateEvent = async (req,res) => {

    const { event_id } = req.params;

    const { name , description , date , time, image_url, place} = req.body;

    const { data , error } = await supabase
        .from("events")
        .update([
            {
                name:name,
                description:description,
                date:date,
                time:time,
                image_url:image_url,
                place:place     
            }
        ])
        .eq("event_id",event_id)

    if (error){
        return res.status(500).json({ error: error.message});
    }

    res.json({
        message:"event Updated Successfully..",
        data
    })
}

const deleteEvent = async (req,res) => {

    const { event_id } = req.params;

    const { error } = await supabase
        .from("events")
        .delete()
        .eq("event_id",event_id);

    if(error){
        return res.status(500).json({
            message: "Failed to Delete event",
            error: error.message,
        })
    }

    res.json({
        message: "event deleted successfully",
    })
}

const getEvents = async (req,res) => {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_id",{ ascending:false });

    if(error){
        return res.status(500).json({
            message: "Failed to fetch events",
            error: error.message,
        })
    }

    res.json(data)
}

const getEvent = async (req,res) => {
    const { event_id } = req.params;    
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("event_id", event_id)
        .single();

    if(error){
        return res.status(500).json({
            message: "Failed to fetch event",
            error: error.message,
        })
    }

    res.json(data)
}

const participateEvent = async (req, res) => {
  const { name, email, phone, event_id, user_id } = req.body;

  try {
    const payload = {
      event_id,
      user_name: name,
      email,
      phone,
      user_id: user_id || null,
      registration_date: new Date().toISOString(),
      status: "registered",
    };

    // ✅ SINGLE INSERT ONLY
    const { data, error } = await supabase
      .from("event_participant")
      .insert([payload])
      .select();

    if (error) {
      return res.status(500).json({
        message: "Failed to register participation",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Participation registered successfully",
      data: data,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error during participation registration",
      error: error.message,
    });
  }
};


module.exports = { addEvent ,  updateEvent , deleteEvent , getEvents , getEvent, participateEvent }