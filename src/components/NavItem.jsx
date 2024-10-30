import { NavLink } from "react-router-dom";

const NavItem = ({ to, onClick, children }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `hover:text-orange-500 ${isActive ? "text-orange-500" : ""}`
    }
  >
    {children}
  </NavLink>
);

export default NavItem;
