import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProjectList from "./components/ProjectList";
import ToDoList from "./components/Todo";
import UserList from "./components/UserList";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/common/Home";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/task" element={<ToDoList />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route exact path="/login" element={<LoginForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
