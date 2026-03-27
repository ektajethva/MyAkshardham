const supabase = require("../config/supabaseClient");
const jwt = require("jsonwebtoken")

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

  const token = jwt.sign(
    {
      id: data.user_id,
      name: data.name,
      email: data.email,
      role: data.role
    },
    process.env.JWT_SECRET,
    {expiresIn:"30d"}
  )

  res.json({
    message: "Login successful",
    token,
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

const saveUser = async (req, res) => {
  try {
    const { user_id, name, email, role } = req.body;

    // console.log("Incoming:", req.body);

    const { data: existing } = await supabase
      .from("users")
      .select("user_id")
      .eq("user_id", user_id)
      .maybeSingle();

    if (!existing) {
      const { data, error } = await supabase
        .from("users")
        .insert({
          user_id,
          name,
          email,
          role
        });

      if (error) {
        console.log("❌ INSERT ERROR:", error);
        return res.status(400).json({ error: error.message });
      }

      console.log("✅ INSERT SUCCESS:", data);
    }

    res.json({ message: "User saved" });

  } catch (err) {
    console.log("🔥 SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const logout = async ( req, res) =>{
  res.json({ message: "Logout Succesfully"});
}

const updateProfile = async (req, res) => {
  try {
    const { user_id, name, email, phone, password } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID required" });
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("image")
      .eq("user_id", user_id)
      .single();

    if (fetchError) {
      return res.status(400).json({ error: fetchError.message });
    }

    let imageUrl = existingUser.image;

    // ✅ IMAGE UPLOAD FIXED
    if (req.file) {
      const fileName = `${user_id}-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (uploadError) {
        console.log("UPLOAD ERROR:", uploadError);
        return res.status(400).json({ error: uploadError.message });
      }

      // ✅ IMPORTANT FIX (NO const here)
      imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/profile-images/${fileName}`;
    }

    const updateData = {
      name,
      email,
      phone: phone === "null" || phone === "" ? null : Number(phone),
      image: imageUrl,
    };

    if (password && password.trim() !== "") {
      updateData.password = password;
    }

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("user_id", user_id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: "Profile updated successfully",
      user: data[0],
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { googleLogin, registerUser, loginUser, logout , saveUser , updateProfile , getUser};

