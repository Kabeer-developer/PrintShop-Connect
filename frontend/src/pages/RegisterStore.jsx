import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerStore } from "../redux/slices/storeSlice";
import { useNavigate, Link } from "react-router-dom";

const RegisterStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

 const { storeInfo, loading, error } = useSelector(
  (state) => state.store
);


  useEffect(() => {
    if (storeInfo) {
      navigate("/dashboard", { replace: true });
    }
  }, [storeInfo, navigate]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      const file = files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        setErrors({ logo: "Logo must be under 5MB" });
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors({ logo: "Only image files allowed" });
        return;
      }

      setForm((p) => ({ ...p, logo: file }));
      setErrors({});

      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: null }));
  };

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Store name required";
    if (!form.location.trim()) e.location = "Location required";
    if (!form.email.trim()) e.email = "Email required";
    if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("location", form.location.trim());
    fd.append("email", form.email.trim());
    fd.append("password", form.password);
    if (form.logo) fd.append("logo", form.logo);

    const res = await dispatch(registerStore(fd));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard", { replace: true });
    }
  };

  const removeLogo = () => {
    setForm((p) => ({ ...p, logo: null }));
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-center mb-2">
          Register Your Store
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Create a store account to receive print jobs
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Logo */}
          <div className="flex flex-col items-center">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="logo"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-2" />
            )}

            <input
              ref={fileInputRef}
              name="logo"
              type="file"
              accept="image/*"
              onChange={handleChange}
              disabled={loading}
            />

            {errors.logo && (
              <p className="text-red-600 text-sm mt-1">{errors.logo}</p>
            )}

            {logoPreview && (
              <button
                type="button"
                onClick={removeLogo}
                className="text-sm text-red-600 mt-1"
              >
                Remove logo
              </button>
            )}
          </div>

          <input
            name="name"
            placeholder="Store Name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full border px-4 py-3 rounded"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            disabled={loading}
            className="w-full border px-4 py-3 rounded"
          />
          {errors.location && (
            <p className="text-red-600 text-sm">{errors.location}</p>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full border px-4 py-3 rounded"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            className="w-full border px-4 py-3 rounded"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            className="w-full border px-4 py-3 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">
              {errors.confirmPassword}
            </p>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700">
              {typeof error === "string" ? error : "Registration failed"}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Store"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already registered?{" "}
          <Link to="/login" className="text-green-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterStore;
