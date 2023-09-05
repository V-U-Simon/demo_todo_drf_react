import { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import ProjectList from "./components/Projects";
import ToDoList from "./components/Todo";
import UserList from "./components/UserList";
import NotFound from "./components/NotFound";

const App = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://127.0.0.1:8000/api/projects/")
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://127.0.0.1:8000/api/todo/")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }, []);

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
        </nav>

        <Routes>
          <Route exact path="/" element={<UserList users={users} />} />
          <Route exact path="/users" element={<UserList users={users} />} />
          <Route
            exact
            path="/projects"
            element={<ProjectList projects={projects} />}
          />
          <Route exact path="/todos" element={<ToDoList todos={todos} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
