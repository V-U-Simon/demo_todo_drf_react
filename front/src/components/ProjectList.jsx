export default function ProjectList({ projects }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Создатель</th>
          <th>Ссылка</th>
          <th>Создано</th>
          <th>Обновлено</th>
          <th>Активно</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </tbody>
    </table>
  );
}

function ProjectItem({ project }) {
  return (
    <tr>
      <td>{project.name}</td>
      <td>{project.creator}</td>
      <td>{project.repository_url}</td>
      <td>{project.created}</td>
      <td>{project.updated}</td>
      <td>{project.is_active.toString()}</td>
    </tr>
  );
}
