const supabase = require("../config/supabaseClient")

const addDonation = async (req,res) => {

    const { amount , method , date , user_id } = req.body;

    const { data, error } = await supabase
        .from("donors")
        .insert([
            {
                amount,
                methods: method,
                date,
                user_id
            }
        ])
        .select()

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json({
        message: "Donation saved successfully",
        data
    });
}

const add_Product_payment = async (req,res) => {
    const {total_amount , payment_method , payment_status , payment_date , user_id } = req.body;

    const { data, error } = await supabase
        .from("payments")
        .insert([
            {
                total_amount,
                payment_method,
                payment_status,
                payment_date,
                user_id
            }
        ])
        .select()
    
    if (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }

    res.json({ payment: data[0] });
}

const add_Payment_Items = async (req,res) => {
    const items = req.body;

    const { data , error } = await supabase
        .from("payment_items")
        .insert(items)
        .select()

    if (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }

    res.json({ items: data });
}

module.exports = { addDonation , add_Product_payment , add_Payment_Items }