import { Navigate } from "react-router-dom";
import useSession from "../../store/useSession";
import { useEffect } from "react";

export function Logout() {
  const { setSession } = useSession();
  useEffect(() => {
    console.log("LOGOUT");
    setSession({ session: {} });
  }, []);

  return <Navigate to="/" replace={true} />;
}
