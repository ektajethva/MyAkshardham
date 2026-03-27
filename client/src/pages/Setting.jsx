import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Camera } from "lucide-react";

export default function SettingsPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  // Cleanup preview
 useEffect(() => {
  const fetchUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.user_id) return;

      const res = await axios.get(
        `http://localhost:5000/auth/getUser/${user.user_id}`
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      setPreview(res.data.image);
      setForm({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        role: res.data.role,
        password: "",
      });

    } catch (err) {
      console.log(err);
    }
  };

  fetchUser();
}, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image allowed ❌");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max 2MB image ❌");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("user_id", user.user_id);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone || null);
      formData.append("password", form.password || null);

      if (image) formData.append("image", image);

      const res = await axios.put(
        "http://localhost:5000/auth/updateUser",
        formData
      );

      toast.success("Profile updated ✅");

      const updatedUser = { ...user, ...res.data.user };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setPreview(res.data.user.image);
      setImage(null);
      setForm({ ...form, password: "" });

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-300 to-white p-6">

    <div className="max-w-4xl mx-auto space-y-6">

      {/* 🔥 HEADER CARD */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-300 rounded-2xl shadow-lg p-6 flex items-center gap-5 text-white">

        <div className="relative">
          <img
            src={
              preview
                ? `${preview}?t=${Date.now()}`
                : "https://i.pravatar.cc/150"
            }
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />

          {/* Upload */}
          <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow hover:scale-110 transition">
            <Camera className="text-orange-500 w-4 h-4" />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div>
          <h2 className="text-2xl font-bold">{form.name}</h2>
          <p className="text-orange-100">{form.email}</p>
          <p className="text-xs mt-1 opacity-80">Manage your profile settings</p>
        </div>
      </div>

      {/* 🔥 FORM CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">

        <h3 className="text-lg font-semibold text-orange-600 border-b pb-2">
          Personal Information
        </h3>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-600">Role</label>
            <input
              value={form.role}
              disabled
              className="w-full border rounded-lg p-2 mt-1 bg-gray-100 cursor-not-allowed"
            />
          </div>

        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-600">New Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-200 transform hover:scale-[1.02]"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>

      </div>

    </div>
  </div>
);
}