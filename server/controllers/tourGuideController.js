const supabase = require("../config/supabaseClient")

const addGuide = async (req,res) => {
    const { name , photo , bio , languages , rating } = req.body;

    const { data , error } = await supabase
        .from("tour_guide")
        .insert([
            {
                name:name,
                photo:photo,
                bio:bio,
                languages:languages,
                rating:rating,
            }
        ])
    
    if(error){
        return res.status(500).json(error);
    }

    res.json({message:"guide added",data})
}

const updateGuide = async (req,res) => {

    const { guide_id } = req.params;

    const { name , photo , bio , languages , rating } = req.body;

    const { data , error } = await supabase
        .from("tour_guide")
        .update([
            {
                name:name,
                photo:photo,
                bio:bio,
                languages:languages,
                rating:rating
            }
        ])
        .eq("guide_id",guide_id)

    if (error){
        return res.status(500).json({ error: error.message});
    }

    res.json({
        message:"Guide Updated Successfully..",
        data
    })
}

const deleteGuide = async (req,res) => {

    const { guide_id } = req.params;

    const { error } = await supabase
        .from("tour_guide")
        .delete()
        .eq("guide_id",guide_id);

    if(error){
        return res.status(500).json({
            message: "Failed to Delete Guide",
            error: error.message,
        })
    }

    res.json({
        message: "Guide deleted successfully",
    })
}

const getGuides = async (req,res) => {
    const { data, error } = await supabase
        .from("tour_guide")
        .select("*")
        .order("guide_id",{ ascending:false });

    if(error){
        return res.status(500).json({
            message: "Failed to fetch guides",
            error: error.message,
        })
    }

    res.json(data)
}

module.exports = { addGuide ,  updateGuide , deleteGuide , getGuides}