import { useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return <div>Page not found: {location.pathname}</div>;
}