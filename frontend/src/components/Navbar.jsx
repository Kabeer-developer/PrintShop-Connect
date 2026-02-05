import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/storeSlice";

const Navbar = () => {
  const { storeInfo } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="border-b bg-white px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        Scan2Print
      </Link>

      <div className="flex gap-4">
        {storeInfo ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
