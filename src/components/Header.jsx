import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";
import { FaBars, FaTimes } from "react-icons/fa";
import useOnline from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { selectCartCount } from "../utils/cartSlice";
import NavItem from "./NavItem";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for the hamburger menu
  const isOnline = useOnline();
  const totalCount = useSelector(selectCartCount);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="flex items-center justify-between bg-white text-black font-bold fixed w-full shadow-md z-50 h-16 px-4 md:px-10">
      {/* Logo / Brand Name */}
      <Link
        to="/"
        className="tracking-widest font-bold text-2xl"
        aria-label="Home"
      >
        Fast Food Co.
      </Link>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center space-x-4 md:hidden">
        <NavLink
          to="/cart"
          className="flex items-center space-x-1"
          aria-label="Cart"
        >
          <span className="font-medium">{totalCount}</span>
          <HiShoppingCart size={24} />
        </NavLink>

        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex pr-8">
        <ul className="flex items-center space-x-7">
          <li className="flex items-center">{isOnline ? "🟢" : "🔴"}</li>
          <li>
            <NavItem to="/">Home</NavItem>
          </li>
          <li>
            <NavItem to="/contact">Contact Us</NavItem>
          </li>
          <li>
            <NavItem to="/grocery">Grocery</NavItem>
          </li>
          <li>
            <NavItem to="/login">Login</NavItem>
          </li>
        </ul>

        <NavLink
          to="/cart"
          className="flex items-center space-x-2 px-8 hover:text-orange-500"
          aria-label="Cart"
        >
          <span className="font-bold">{totalCount}</span>
          <HiShoppingCart />
        </NavLink>
      </nav>

      {/* Mobile Header Navigation */}
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
            <li className="flex items-center">{isOnline ? "🟢" : "🔴"}</li>
            <li>
              <NavItem to="/" onClick={toggleMenu}>
                Home
              </NavItem>
            </li>
            <li>
              <NavItem to="/contact" onClick={toggleMenu}>
                Contact Us
              </NavItem>
            </li>
            <li>
              <NavItem to="/grocery" onClick={toggleMenu}>
                Grocery
              </NavItem>
            </li>
            <li>
              <NavItem to="/login" onClick={toggleMenu}>
                Login
              </NavItem>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
