import axios from "axios";
import { useContext, useState } from "react";
// import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import useSession from "../store/useSession";

export default function LoginForm() {
  const navigate = useNavigate();
  const session = useSession();
  // const [token, setToken] = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const changeLogin = (event) => setLogin(event.target.value);
  const changePassword = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api-auth-token/", {
        username: login,
        password: password,
      })
      .then((response) => {
        session.login(response.data);
        console.log(response.data);
        navigate(localStorage.getItem("previousUrl") || "/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Login</span>
        </label>
        <input
          type="text"
          name="login"
          placeholder="login"
          value={login}
          onChange={changeLogin}
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={changePassword}
          className="input input-bordered"
        />
      </div>

      <button type="submit" value="Login" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
