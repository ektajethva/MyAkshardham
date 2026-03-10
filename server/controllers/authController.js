const supabase = require("../config/supabaseClient");

// Normal registration (email/password)
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password,phone } = req.body;

  const name = `${firstName} ${lastName}`; // Combine firstName + lastName

  const { data, error } = await supabase.from("users").insert({
    name,
    email,
    password, // optional: hash it
    phone
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: "User registered", data });
};

// Normal login (email/password)
const loginUser = async (req, res) => {

  const { email, password, role } = req.body;

  let table = role === "admin" ? "admins" : "users";

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  res.json({
    message: "Login successful",
    user: data
  });

};

// Google OAuth login
const googleLogin = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173", // frontend redirect
    },
  });

  if (error) return res.status(400).json({ error: error.message });

  res.redirect(data.url);
};

module.exports = { googleLogin, registerUser, loginUser };

