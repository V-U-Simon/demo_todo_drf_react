import useTodo from "../../store/useTodo";
import { apiProjects } from "../../api/apiProjects";

export function DeleteProjectButton(props) {
  const deleteProject = useTodo((store) => store.deleteProject);
  async function handleDeleteProject() {
    try {
      await apiProjects.remove(props);
      deleteProject(props);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button className="btn btn-warning" onClick={handleDeleteProject}>
      {props.children}
    </button>
  );
}
