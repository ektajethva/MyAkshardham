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

const add_orders = async ( req,res ) => {
    const { orders } = req.body;

    const { data , error } = await supabase
        .from("orders")
        .insert(orders)
        .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Orders added successfully",
      data,
    });

}

const getDonation = async (req,res) => {
    try {
    const { data, error } = await supabase
      .from("donors")
      .select(`
        donor_id,
        amount,
        methods,
        date,
        user_id,
        users (
          name,
          email
        )
      `)
      .order("date", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getDonationStats = async (req,res) => {
     try {
    const { data, error } = await supabase
      .from("donors")
      .select("amount, date");

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const totalDonors = data.length;

    const totalAmount = data.reduce((sum, d) => sum + d.amount, 0);

    const avgDonation = totalDonors > 0
      ? Math.round(totalAmount / totalDonors)
      : 0;

    // ✅ This Month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthAmount = data
      .filter(d => {
        const dDate = new Date(d.date);
        return (
          dDate.getMonth() === currentMonth &&
          dDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, d) => sum + d.amount, 0);

    res.status(200).json({
      totalDonors,
      totalAmount,
      avgDonation,
      thisMonthAmount
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { addDonation , add_Product_payment , add_Payment_Items , add_orders , getDonation , getDonationStats }