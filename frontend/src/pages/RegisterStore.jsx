import { useDispatch, useSelector } from "react-redux";
import { registerStore } from "../redux/slices/storeSlice";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();

  const { storeInfo, loading, error } = useSelector((s) => s.store);

  const [form, setForm] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (storeInfo) navigate("/dashboard");
  }, [storeInfo, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogo(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (logo) fd.append("logo", logo);

    await dispatch(registerStore(fd));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Your Store
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Start receiving print jobs today
        </p>

        <form onSubmit={submit} className="space-y-4">
          {/* Logo Upload */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-3 border">
              {preview ? (
                <img
                  src={preview}
                  alt="logo preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  Logo
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={handleLogoChange}
              className="text-sm"
            />
          </div>

          {/* Inputs */}
          <input
            name="name"
            placeholder="Store Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {typeof error === "string"
                ? error
                : error.message || "Registration failed"}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register Store"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterStore;
