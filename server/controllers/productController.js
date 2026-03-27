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

const getAllOrder = async (req,res) => {
    try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("order_id", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // this is actually order_id
    const { status } = req.body;

    console.log("👉 ID:", id);
    console.log("👉 STATUS:", status);

    const { data, error } = await supabase
      .from("orders")
      .update({ status:status })
      .eq("order_id", id)   // ✅ FIX HERE
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Updated", data });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserOrder = async (req,res) => {
    try {
    const { user_id } = req.params; // OR req.user.id if using auth 

    const { data, error } = await supabase
      .from("orders")
      .select(`
        order_id,
        product_name,
        total,
        date,
        status,
        user_id
      `)
      .eq("user_id", user_id)
      .order("date", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addProduct ,  updateProduct , deleteProduct , getProduct , getAllOrder , updateOrderStatus, getUserOrder}