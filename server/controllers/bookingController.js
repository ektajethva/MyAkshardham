const supabase = require("../config/supabaseClient")

const add_Visit_Booking = async (req,res) =>{

    const { user_id , name , visit_date , number_of_person , time_slot  } = req.body;

    const { data , error } = await supabase
        .from("visit_booking")
        .insert([
            {
                user_id,
                name,
                visit_date,
                number_of_person,
                time_slot,
            }
        ])

    if(error){
        return res.status(400).json({ error: error.message })
    }

    res.json({ message:"Booking Successful"});
}

const add_Seva_Booking = async (req,res) => {
    
    const { user_id , name , seva_type , seva_date } = req.body;

    if( !seva_type || !seva_date) {
        return res.status(400).json({ error : "Missing Required Fields.. "})
    }

    else if( !user_id){
        return res.status(400).json({ error: "Please Login First"})
    }

    const { data , error } = await supabase
        .from("seva_aarti_booking")
        .insert([
            {
                user_id,
                name,
                seva_type,
                seva_date
            }
        ])
        .select()

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Seva booking successful",
      booking: data[0]
    });
}

const add_Parking_Booking = async (req,res) => {

    const { user_id , name , parking_date , vehicle_number , time_slot } = req.body;

    if(!parking_date || !vehicle_number || !time_slot){
        return res.status(400).json({ message : "Missing Fields Required.."})
    }

    else if(!user_id){
        return res.status(400).json({ message : "Please Login First..."})
    }

    const { data , error } = await supabase
        .from("parking_booking")
        .insert([
            {
                user_id,
                name,
                parking_date,
                vehicle_number,
                time_slot
            }
        ])
        .select()
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Parking booked successfully",
      booking: data?.[0] || null
    });
}

const add_Tour_Guide_Booking = async (req,res) => {
    
    const { user_id , name , phone_number , booking_date , time_slot , group_size , special_request , languages , guide_id } = req.body;

    // console.log("Incoming:", req.body.guide_id);

    if(!phone_number || !booking_date || !time_slot || !group_size || !special_request || !languages){
        return res.status(400).json({message:"Missing Fields Required..."})
    }

    else if(!user_id){
        return res.status(400).json( {message :"Please Login First.."})
    }

    const { data , error } = await supabase
        .from("tour_guide_booking")
        .insert([
            {
                user_id,
                name,
                phone_number,
                booking_date,
                time_slot,
                group_size,
                special_request,
                languages,
                guide_id
            }
        ])
        .select()

     if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Tour guide booked successfully",
      booking: data[0]
    });
}

module.exports = { add_Visit_Booking , add_Seva_Booking , add_Parking_Booking , add_Tour_Guide_Booking}