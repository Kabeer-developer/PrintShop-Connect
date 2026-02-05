import { useDispatch, useSelector } from "react-redux";
import { registerStore } from "../redux/slices/storeSlice";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (storeInfo) navigate("/dashboard");
  }, [storeInfo, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (logo) fd.append("logo", logo);

    await dispatch(registerStore(fd));
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-3">
      <h2 className="text-xl font-bold">Register Store</h2>

      {["name", "location", "email", "password"].map((f) => (
        <input
          key={f}
          placeholder={f}
          type={f === "password" ? "password" : "text"}
          value={form[f]}
          onChange={(e) =>
            setForm({ ...form, [f]: e.target.value })
          }
          className="border p-2 w-full"
        />
      ))}

      <input
        type="file"
        ref={fileRef}
        onChange={(e) => setLogo(e.target.files[0])}
      />

      {error && <p className="text-red-600">{error}</p>}

      <button className="bg-green-600 text-white px-4 py-2">
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterStore;
