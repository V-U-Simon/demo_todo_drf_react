import { useEffect } from "react";
import useTodo from "../../store/useTodo";
import { apiProjects } from "../../api/apiProjects";

import { ProjectsForm } from "./ProjectForm";
import { ProjectItem } from "./ProjectItem";

export function ProjectList() {
  const projects = useTodo((store) => store.projects);
  const setProjects = useTodo((store) => store.setProjects);

  useEffect(() => {
    const load = async () => {
      const projectList = await apiProjects.fetch();
      setProjects(projectList);
    };
    load();
  }, [setProjects]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col sm:flex-row items-start">
        <ProjectsForm />
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
