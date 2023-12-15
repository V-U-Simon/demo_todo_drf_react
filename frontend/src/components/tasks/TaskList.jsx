import { useEffect } from "react";
import useTodo from "../../store/useTodo";
import { apiTasks } from "../../api/apiTasks";

import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";
import { useParams } from "react-router-dom";
import { apiProjects } from "../../api/apiProjects";

export function TaskList() {
  const { project } = useParams();

  const projects = useTodo((store) => store.projects);
  const tasks = useTodo((store) => store.tasks);

  const setTasks = useTodo((store) => store.setTasks);
  const setProjects = useTodo((store) => store.setProjects);

  useEffect(() => {
    const load = async () => {
      const projectList = await apiProjects.fetch();
      setProjects(projectList);
      const taskList = await apiTasks.fetchByProject(project);
      setTasks(taskList);
    };
    load();
  }, [project, setTasks]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col sm:flex-row items-start">
        <div className="flex flex-col  gap-4">
          <h1 className="text-4xl font-bold text-center truncate max-w-md">
            Project: {projects.find((p) => p.id === 22)?.title}
          </h1>
          <TaskForm project={project} />
        </div>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
