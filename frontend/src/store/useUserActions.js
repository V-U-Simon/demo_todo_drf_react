import { useHeaders } from "./AuthContext";
import axios from "axios";

export default function useUserActions(state, setState) {
  const headers = useHeaders();

  function list() {
    axios
      .get("http://127.0.0.1:8000/api/users/", { headers })
      .then((response) => {
        setState((prevState) => ({ ...prevState, users: response.data }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, users: [] }));
        console.log(error);
      });
  }

  function retrieve(id) {
    axios
      .get(`http://127.0.0.1:8000/api/users/${id}`, { headers })
      .then((response) => {
        setState(() => response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, users: [] }));
        console.log(error);
      });
  }

  function create(userData) {
    axios
      .post("http://127.0.0.1:8000/api/users/", userData, { headers })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          users: [...prevState.users, response.data],
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function remove(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/users/${id}/`, { headers })
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          users: prevState.users.filter((user) => user.id !== id),
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function update(id, userData) {
    axios
      .put(`http://127.0.0.1:8000/api/users/${id}/`, userData, {
        headers,
      })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          users: prevState.users.map((user) =>
            user.id === id ? response.data : user
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
