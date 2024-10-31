import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";
import { FaBars, FaTimes } from "react-icons/fa";
import useOnline from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { selectCartCount } from "../utils/cartSlice";
import NavItem from "./NavItem";
import HoverCart from "./HoverCart";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for the hamburger menu
  const [isCartHovered, setIsCartHovered] = useState(false);
  const isOnline = useOnline();
  const totalCount = useSelector(selectCartCount);
  const timeoutId = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId.current);
    setIsCartHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => setIsCartHovered(false), 200);
  };

  return (
    <header className="flex items-center justify-between bg-white text-black font-bold fixed w-full shadow-md z-50 h-16 px-4 md:px-10">
      <Link
        to="/"
        className="tracking-widest font-bold text-2xl"
        aria-label="Home"
      >
        Fast Food Co.
      </Link>

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

      <nav className="hidden md:flex pr-8 relative">
        <ul className="flex items-center space-x-7">
          <li className="flex items-center">{isOnline ? "🟢" : "🔴"}</li>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/contact">Contact Us</NavItem>
          <NavItem to="/grocery">Grocery</NavItem>
          <NavItem to="/login">Login</NavItem>
        </ul>

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <NavLink
            to="/cart"
            className="flex items-center space-x-2 px-8 hover:text-orange-500"
            aria-label="Cart"
          >
            <span className="font-bold">{totalCount}</span>
            <HiShoppingCart />
          </NavLink>

          {isCartHovered && totalCount > 0 && (
            <div
              className="absolute top-11 right-20 bg-white shadow-lg p-2 border-t-2 border-t-orange-500"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <HoverCart setIsCartHovered={setIsCartHovered} />
            </div>
          )}
        </div>
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
            <li className="flex items-center">{isOnline ? "🟢" : "🔴"}</li>
            <NavItem to="/" onClick={toggleMenu}>
              Home
            </NavItem>
            <NavItem to="/contact" onClick={toggleMenu}>
              Contact Us
            </NavItem>
            <NavItem to="/grocery" onClick={toggleMenu}>
              Grocery
            </NavItem>
            <NavItem to="/login" onClick={toggleMenu}>
              Login
            </NavItem>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
