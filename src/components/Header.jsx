import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";
import { FaBars, FaTimes } from "react-icons/fa";
import useOnline from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import { selectCartCount } from "../utils/cartSlice";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const [isOpen, setIsOpen] = useState(false); // State for the hamburger menu

  const isOnline = useOnline();
  const { loggedInUser } = useContext(UserContext);
  const totalCount = useSelector(selectCartCount);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleLoginLogout = () =>
    setBtnNameReact((prev) => (prev === "Login" ? "Logout" : "Login"));

  return (
    <header className="flex items-center justify-between bg-white text-black font-bold fixed w-screen shadow-md z-50 h-16 px-4 md:px-10">
      <Link
        to="/"
        className="tracking-widest font-bold text-[24px]"
        aria-label="Home"
      >
        Fast Food Co.
      </Link>

      <div className="flex items-center space-x-4 md:hidden">
        <NavLink to="/cart" className="flex items-center space-x-1">
          <HiShoppingCart size={24} aria-label="Cart" />
          <span>{totalCount}</span>
        </NavLink>

        <button onClick={toggleMenu} aria-label="Menu">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <nav className="hidden md:flex pr-8">
        <ul className="flex items-center space-x-7">
          <li>{isOnline ? "🟢" : "🔴"}</li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "text-red-500" : ""} hover:text-red-500`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${isActive ? "text-red-500" : ""} hover:text-red-500`
              }
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/grocery"
              className={({ isActive }) =>
                `${isActive ? "text-red-500" : ""} hover:text-red-500`
              }
            >
              Grocery
            </NavLink>
          </li>
          <button
            onClick={toggleLoginLogout}
            className="text-black transition duration-300 hover:text-red-500"
          >
            {btnNameReact}
          </button>
          {btnNameReact === "Logout" && <li>{loggedInUser}</li>}
        </ul>

        <NavLink to="/cart" className="flex items-center space-x-2 px-8">
          <HiShoppingCart />
          <span>{totalCount}</span>
        </NavLink>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center py-16">
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-5 text-white text-3xl"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <ul className="flex flex-col items-center space-y-8 text-white text-2xl">
            <li>{isOnline ? "🟢" : "🔴"}</li>
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className="transition-colors duration-300 hover:text-red-500"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={toggleMenu}
                className="transition-colors duration-300 hover:text-red-500"
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/grocery"
                onClick={toggleMenu}
                className="transition-colors duration-300 hover:text-red-500"
              >
                Grocery
              </NavLink>
            </li>
            <li>
              <button
                onClick={toggleLoginLogout}
                className="transition-colors duration-300 hover:text-red-500"
              >
                {btnNameReact}
              </button>
            </li>
            {btnNameReact === "Logout" && <li>{loggedInUser}</li>}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
