import ProjectsForm from "./ProjectForm";

export default function ProjectList({ projects, projectActions }) {
  return (
    <>
      <ProjectsForm props={projects} createProject={projectActions.create} />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Название</th>
            <th>Ссылка</th>
            <th>Создано</th>
            <th>Обновлено</th>
            <th>Активно</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              removeProject={projectActions.remove}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function ProjectItem({ project, removeProject }) {
  console.dir(project);
  return (
    <tr>
      <td>{project.id}</td>
      <td>{project.name}</td>
      <td>{project.repositoryUrl}</td>
      <td>{project.created}</td>
      <td>{project.updated}</td>
      <td>{project.isActive.toString()}</td>
      <td>
        <button
          className="brn text-red-600"
          onClick={(event) => removeProject(project.id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
}
