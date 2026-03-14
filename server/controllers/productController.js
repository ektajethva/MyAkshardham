const supabase = require("../config/supabaseClient")

const addProduct = async (req,res) => {
    const { name , description , price , stock , image_url } = req.body;

    const status = stock > 0 ? "available" : "unavailable";

    const { data , error } = await supabase
        .from("products")
        .insert([
            {
                product_name:name,
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

    res.json({message:"product added",data})
}

const updateProduct = async (req,res) => {

    const { product_id } = req.params;

    const { name , description , price , stock , image_url } = req.body;

    const status = stock > 0 ? "available" : "unavailable";

    const { data , error } = await supabase
        .from("products")
        .update([
            {
                product_name:name,
                description:description,
                price:price,
                stock:stock,
                image:image_url,
                status:status
            }
        ])
        .eq("product_id",product_id)

    if (error){
        return res.status(500).json({ error: error.message});
    }

    res.json({
        message:"Product Updated Successfully..",
        data
    })
}

const deleteProduct = async (req,res) => {

    const { product_id } = req.params;

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("product_id",product_id);

    if(error){
        return res.status(500).json({
            message: "Failed to Delete Product",
            error: error.message,
        })
    }

    res.json({
        message: "Product deleted successfully",
    })
}

const getProduct = async (req,res) => {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("product_id",{ ascending:false });

    if(error){
        return res.status(500).json({
            message: "Failed to fetch products",
            error: error.message,
        })
    }

    res.json(data)
}

module.exports = { addProduct ,  updateProduct , deleteProduct , getProduct}