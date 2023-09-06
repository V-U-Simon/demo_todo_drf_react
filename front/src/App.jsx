import { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import ProjectList from "./components/ProjectList";
import ToDoList from "./components/Todo";
import UserList from "./components/UserList";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [state, setState] = useState({
    users: [],
    projects: [],
    todos: [],
    token: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: " + token);
    setState((prevState) => ({ ...prevState, token }));
    getData();
  }, []);

  const obtainAuthToken = (login, password) => {
    axios
      .post("http://127.0.0.1:8000/api-auth-token/", {
        username: login,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setState((prevState) => ({ ...prevState, token }));
        getData();
      })
      .catch((error) => console.log(error));
  };

  const logOut = () => {
    localStorage.setItem("token", "");
    setState((prevState) => ({ ...prevState, token: "" }));
    getData();
  };

  const isAuth = () => localStorage.getItem("token");

  const getHeaders = () => {
    if (isAuth()) {
      return {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
    }
    return {};
  };

  const getData = () => {
    const headers = getHeaders();
    console.log("Headers:", headers);
    axios
      .get("http://127.0.0.1:8000/api/users/", { headers })
      .then((response) => {
        setState((prevState) => ({ ...prevState, users: response.data }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, users: [] }));
        console.log(error);
      });

    axios
      .get("http://127.0.0.1:8000/api/projects/", { headers })
      .then((response) => {
        setState((prevState) => ({ ...prevState, projects: response.data }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, projects: [] }));
        console.log(error);
      });

    axios
      .get("http://127.0.0.1:8000/api/todo/", { headers })
      .then((response) => {
        setState((prevState) => ({ ...prevState, todos: response.data }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, todos: [] }));
        console.log(error);
      });
  };

  return (
    <div>
      <BrowserRouter>
        <nav>
          <li>
            <Link to="/users">Пользователи</Link>
          </li>
          <li>
            <Link to="/projects">Проекты</Link>
          </li>
          <li>
            <Link to="/todos">Задачи</Link>
          </li>
          <li>
            {isAuth() ? (
              <button onClick={logOut}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </nav>

        <Routes>
          <Route exact path="/" element={<UserList users={state.users} />} />
          <Route
            exact
            path="/users"
            element={<UserList users={state.users} />}
          />
          <Route
            exact
            path="/projects"
            element={<ProjectList projects={state.projects} />}
          />
          <Route
            exact
            path="/todos"
            element={<ToDoList todos={state.todos} />}
          />
          <Route
            exact
            path="/login"
            element={<LoginForm obtainAuthToken={obtainAuthToken} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
