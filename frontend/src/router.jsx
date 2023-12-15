import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ProjectList } from "./components/projects/ProjectList";
import { NotFound } from "./components/error/NotFound";
import { LoginForm } from "./components/auth/LoginForm";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/common/Home";
import { Logout } from "./components/auth/Logout";
import { ProtectedUniversal } from "./components/auth/ProtectedRoutes";
import { TaskList } from "./components/tasks/TaskList";
import { Profile } from "./components/auth/Profile";
import { Registration } from "./components/auth/Registration";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="registration" element={<Registration />} />
          <Route path="" element={<ProtectedUniversal />}>
            <Route path="profile/" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/todo" element={<ProjectList />} />
            <Route path="/todo/:project/tasks/" element={<TaskList />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
