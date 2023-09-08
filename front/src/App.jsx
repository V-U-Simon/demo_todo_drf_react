import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import ProjectList from "./components/ProjectList";
import ToDoList from "./components/Todo";
import UserList from "./components/UserList";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import { AuthContext } from "./components/AuthContext";
import useProjectActions from "./components/useProjectActions";
import useTodoActions from "./components/useTodoActions";
import useUserActions from "./components/useUserActions";

const App = () => {
  const [token] = useContext(AuthContext);
  const [state, setState] = useState({
    users: [],
    projects: [],
    todos: [],
  });

  const projectActions = useProjectActions(state, setState);
  const todoActions = useTodoActions(state, setState);
  const userActions = useUserActions(state, setState);

  const isAuth = () => Boolean(token);

  useEffect(() => {
    console.log("state: " + token);
    console.log("storage: " + localStorage.getItem("token"));
    if (token) {
      projectActions.list();
      todoActions.list();
      userActions.list();
    }
  }, [token]);

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
          <li>{isAuth() ? <Logout /> : <Link to="/login">Login</Link>}</li>
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
            element={
              <ProjectList
                projects={state.projects}
                projectActions={projectActions}
              />
            }
          />
          <Route
            exact
            path="/todos"
            element={
              <ToDoList
                todos={state.todos}
                todoActions={todoActions}
                projects={state.projects}
                users={state.users}
              />
            }
          />
          <Route exact path="/login" element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
