import { create } from "zustand";
import { persist } from "zustand/middleware";

/* state and actions */
let useTodo = (set) => ({
  projects: [],
  setProjects: (project) => set({ projects: project }),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (updatedProject) =>
    set((state) => ({
      projects: state.projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)),
    })),
  deleteProject: (project) => set((state) => ({ projects: [...state.projects.filter((p) => p.id !== project.id)] })),
  tasks: [],
  setTasks: (task) => set({ tasks: task }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (updatedProject) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === updatedProject.id ? updatedProject : task)),
    })),
  deleteTask: (task) => set((state) => ({ tasks: [...state.tasks.filter((p) => p.id !== task.id)] })),
});

/* middleware */
useTodo = persist(useTodo, { name: "todo-store" });

export default create(useTodo);
