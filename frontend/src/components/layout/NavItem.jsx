import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// type NavItemProps = {
//   to: string,
//   name: string,
//   className?: string,
// };

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export function NavItem({ to, name, className }) {
  return (
    <li>
      <NavLink className={className} to={to}>
        {name}
      </NavLink>
    </li>
  );
}
