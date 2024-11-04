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
    <header className="fixed z-50 flex h-16 w-full items-center justify-between bg-white px-4 font-bold text-black shadow-md sm:justify-evenly md:px-10">
      <Link
        to="/"
        className="xs:text-xl whitespace-nowrap text-lg font-bold tracking-widest sm:text-2xl md:text-3xl"
        aria-label="Home"
      >
        Fast Food Co.
      </Link>

      <div className="flex items-center justify-between space-x-4 md:hidden">
        <NavLink
          to="/cart"
          className="flex items-center space-x-1"
          aria-label="Cart"
        >
          <span className="text-sm font-medium">
            {totalCount > 0 ? totalCount : ""}
          </span>
          <HiShoppingCart size={20} />
        </NavLink>
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      <nav className="relative hidden pr-8 md:flex">
        <div className="flex items-center justify-between space-x-4 whitespace-nowrap lg:space-x-7">
          <p className="flex items-center">{isOnline ? "🟢" : "🔴"}</p>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/contact">Contact Us</NavItem>
          <NavItem to="/grocery">Grocery</NavItem>
          <NavItem to="/offers">Offers</NavItem>
          <NavItem to="/help">Help</NavItem>
          <NavItem to="/login">Login</NavItem>
        </div>

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <NavLink
            to="/cart"
            className="flex items-center space-x-2 px-4 hover:text-orange-500 md:px-4"
            aria-label="Cart"
          >
            <span className="font-bold">
              {totalCount > 0 ? totalCount : ""}
            </span>
            <HiShoppingCart size={20} />
          </NavLink>

          {isCartHovered && totalCount > 0 && (
            <div
              className="absolute right-4 top-12 border-t-2 border-t-orange-500 bg-white p-2 shadow-lg md:right-20 md:top-11"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <HoverCart setIsCartHovered={setIsCartHovered} />
            </div>
          )}
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center bg-black py-16 md:hidden">
          <button
            onClick={toggleMenu}
            className="absolute right-5 top-5 text-3xl text-white"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <ul className="flex flex-col items-center space-y-8 text-xl text-white">
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
