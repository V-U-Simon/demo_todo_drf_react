import { useState } from "react";

export default function LoginForm({ obtainAuthToken }) {
  const [state, setState] = useState({
    login: "",
    password: "",
  });

  const handleSubmit = (event) => {
    obtainAuthToken(state.login, state.password);
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          value={state.login}
          onChange={handleChange}
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
          value={state.password}
          onChange={handleChange}
          className="input input-bordered"
        />
      </div>

      <button type="submit" value="Login" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
