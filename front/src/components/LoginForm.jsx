import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [token, setToken] = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const changeLogin = (event) => setLogin(event.target.value);
  const changePassword = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    axios
      .post("http://127.0.0.1:8000/api-auth-token/", {
        username: login,
        password: password,
      })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        console.log("write in localStorage: " + response.data.token);
      })
      .catch((error) => console.log(error));
    event.preventDefault();
    navigate(localStorage.getItem("previousUrl") || "/");
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
