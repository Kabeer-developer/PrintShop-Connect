import { useDispatch, useSelector } from "react-redux";
import { loginStore } from "../redux/slices/storeSlice";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Store Login
        </h2>
        <p className="text-gray-500 text-center mt-1">
          Sign in to manage your print shop
        </p>

        {/* Form */}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have a store?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginStore;
