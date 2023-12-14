import create from "zustand";
import { persist } from "zustand/middleware";

/* state and actions */
let useTodo = (set) => ({
  tasks: [],
  projects: [],
});

/* middleware */
useTodo = persist(useTodo, { name: "todo-store" });

export default create(useTodo);
