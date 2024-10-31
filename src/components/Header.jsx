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
    <header className="fixed z-50 flex h-16 w-full items-center justify-between bg-white px-4 font-bold text-black shadow-md md:px-10">
      <Link
        to="/"
        className="text-2xl font-bold tracking-widest"
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

      <nav className="relative hidden pr-8 md:flex">
        <ul className="flex items-center space-x-7">
          <li className="flex items-center">{isOnline ? "🟢" : "🔴"}</li>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/contact">Contact Us</NavItem>
          <NavItem to="/grocery">Grocery</NavItem>
          <NavItem to="/offers">Offers</NavItem>
          <NavItem to="/help">Help</NavItem>
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
              className="absolute right-20 top-11 border-t-2 border-t-orange-500 bg-white p-2 shadow-lg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <HoverCart setIsCartHovered={setIsCartHovered} />
            </div>
          )}
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center bg-black py-16">
          <button
            onClick={toggleMenu}
            className="absolute right-5 top-5 text-3xl text-white"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <ul className="flex flex-col items-center space-y-8 text-2xl text-white">
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
            <NavItem to="/offers" onClick={toggleMenu}>
              Offers
            </NavItem>
            <NavItem to="/help" onClick={toggleMenu}>
              Help
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
