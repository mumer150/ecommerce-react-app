import {
  ChevronDown,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContexts } from "../context/CartContext";
import { logout } from "../firebase/authService";
import useAuth from "../hooks/useAuth";
import { ToastContexts } from "../context/ToastContext";

export default function Header() {
  const navigate = useNavigate();
  const user = useAuth();

  const { AlreadyAddedNotify, AddedNotify } = useContext(ToastContexts);
  const { cart, setCart, allQuantity } = useContext(CartContexts);

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef();

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      AddedNotify("Logout Successful");
      setCart([]);
      setOpen(false);
      navigate("/login");
    } catch (error) {
      AlreadyAddedNotify(error.message || "Logout Failed");
    }
  };

  return (
    <header className="w-full shadow-md bg-green-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-gray-800">
            E-Mart
          </Link>
        </div>

        {/* NAV (Desktop)
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <span className="hover:text-black cursor-pointer">Home</span>
          <span className="hover:text-black cursor-pointer">Shop</span>
          <span className="hover:text-black cursor-pointer">Categories</span>
          <span className="hover:text-black cursor-pointer">Deals</span>
        </nav> */}

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-gray-700 relative">
          
          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="cursor-pointer hover:text-black" />
            {allQuantity > 0 && (
              <div className="absolute -top-2.5 -right-2 rounded-full text-white flex justify-center items-center bg-red-500 font-semibold w-5 h-5 text-[10px]">
                {allQuantity}
              </div>
            )}
          </Link>

          {/* USER */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 md:gap-2 cursor-pointer"
              >
                <User className="text-green-500" />
                <span className="text-sm hidden md:block truncate max-w-[120px]">
                  {user.displayName || user.email}
                </span>
                <ChevronDown size={16} />
              </div>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl border z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium truncate">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/orders");
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Orders
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <User
              className="cursor-pointer"
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t shadow-sm px-4 py-3 space-y-3">
          <span className="block cursor-pointer">Home</span>
          <span className="block cursor-pointer">Shop</span>
          <span className="block cursor-pointer">Categories</span>
          <span className="block cursor-pointer">Deals</span>
        </div>
      )}
    </header>
  );
}