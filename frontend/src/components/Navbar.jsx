import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/storeSlice";

const Navbar = () => {
  const { storeInfo } = useSelector((state) => state.storeAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMobileMenuOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/" && location.pathname.startsWith("/store"));

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 rounded-lg font-medium transition-colors ${
        isActive(to)
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S2P</span>
            </div>
            <span className="font-bold text-lg">Scan2Print</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/">Home</NavLink>

            {!storeInfo && (
              <NavLink to="/register">Register Store</NavLink>
            )}

            {storeInfo ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>

                <div className="flex items-center gap-3 ml-2">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {storeInfo.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {storeInfo.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>

              {!storeInfo && (
                <NavLink
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register Store
                </NavLink>
              )}

              {storeInfo ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
