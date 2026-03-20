const supabase = require("../config/supabaseClient")

const addEvent = async (req,res) => {
    const { name , description , price , stock , image_url } = req.body;

    const status = stock > 0 ? "available" : "unavailable";

    const { data , error } = await supabase
        .from("events")
        .insert([
            {
                event_name:name,
                description:description,
                price:price,
                stock:stock,
                image:image_url,
                status:status
            }
        ])
    
    if(error){
        return res.status(500).json(error);
    }

    res.json({message:"event added",data})
}

const updateEvent = async (req,res) => {

    const { event_id } = req.params;

    const { name , description , price , stock , image_url } = req.body;

    const status = stock > 0 ? "available" : "unavailable";

    const { data , error } = await supabase
        .from("events")
        .update([
            {
                event_name:name,
                description:description,
                price:price,
                stock:stock,
                image:image_url,
                status:status
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

const getEvent = async (req,res) => {
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

module.exports = { addEvent ,  updateEvent , deleteEvent , getEvent}