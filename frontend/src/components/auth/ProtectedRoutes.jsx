import { Navigate, Outlet } from "react-router-dom";
import useSession from "../../store/useSession";
import { isExpired } from "react-jwt";

import PropTypes from "prop-types";

ProtectedUniversal.propTypes = {
  children: PropTypes.node,
  redirectPath: PropTypes.string,
};

export function isAuthenticated() {
  const session = useSession.getState().session;
  return Boolean(session?.access);
}

export function ProtectedUniversal({ children, redirectPath = "/login/" }) {
  // const { session } = useSession();

  // if (!Boolean(session?.access) || isExpired(session?.access)) return <Navigate to={redirectPath} />;
  if (isAuthenticated()) return children ? <>{children}</> : <Outlet />;
  return <Navigate to={redirectPath} />;
}
