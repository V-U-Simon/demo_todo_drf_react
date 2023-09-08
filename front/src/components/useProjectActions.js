import { useHeaders } from "./AuthContext";
import axios from "axios";

export default function useProjectActions(state, setState) {
  const headers = useHeaders();
  let prevState = state;

  function list() {
    axios
      .get("http://127.0.0.1:8000/api/projects/", { headers })
      .then((response) => {
        setState((prevState) => ({ ...prevState, projects: response.data }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, projects: [] }));
        console.log(error);
      });
  }

  function retrieve(id) {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${id}`, { headers })
      .then((response) => {
        setState(() => response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, projects: [] }));
        console.log(error);
      });
  }

  function create(projectData) {
    axios
      .post("http://127.0.0.1:8000/api/projects/", projectData, { headers })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          projects: [...prevState.projects, response.data],
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function remove(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/projects/${id}/`, { headers })
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          projects: prevState.projects.filter((project) => project.id !== id),
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function update(id, projectData) {
    axios
      .put(`http://127.0.0.1:8000/api/projects/${id}/`, projectData, {
        headers,
      })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          projects: prevState.projects.map((project) =>
            project.id === id ? response.data : project
          ),
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return {
    list,
    retrieve,
    create,
    remove,
    update,
  };
}
