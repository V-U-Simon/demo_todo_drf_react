import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [, setToken] = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem("token", "");
    setToken("");
    navigate("login/");
  };

  return <button onClick={logOut}>Logout</button>;
}
