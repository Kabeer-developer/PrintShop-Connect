import { useDispatch, useSelector } from "react-redux";
import { loginStore } from "../redux/slices/storeSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeInfo, loading, error } = useSelector((s) => s.store);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (storeInfo) navigate("/dashboard");
  }, [storeInfo, navigate]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(loginStore({ email, password }));
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-3">
      <h2 className="text-xl font-bold">Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />

      {error && <p className="text-red-600">{error}</p>}

      <button className="bg-blue-600 text-white px-4 py-2">
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginStore;
