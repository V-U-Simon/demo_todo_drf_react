import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSession from "../../store/useSession";
import { apiAuth } from "../../api/apiAuth";

export function LoginForm() {
  const navigate = useNavigate();
  const { session, setSession } = useSession();
  const [loginErrors, setLoginErrors] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeEmail = (event) => setEmail(event.target.value);
  const changePassword = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await apiAuth.login({ email, password });
      console.log(data);

      setSession(data);
      console.log(session?.access);
      navigate("/");
    } catch (error) {
      setLoginErrors(error?.response?.data);
    }

    // axios
    //   .post("http://127.0.0.1:8000/api-auth-token/", {
    //     username: login,
    //     password: password,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     navigate(localStorage.getItem("previousUrl") || "/");
    //   })
    //   .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Login</span>
        </label>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={changeEmail}
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
        {JSON.stringify(loginErrors?.detail)}
      </div>

      <button type="submit" value="Login" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
