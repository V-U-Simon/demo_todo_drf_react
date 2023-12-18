import { useHeaders } from "./AuthContext";
import axios from "axios";

export default function useTodoActions(state, setState) {
  const headers = useHeaders();

  function list() {
    axios
      .get("http://127.0.0.1:8000/api/todo/", { headers })
      .then((response) => {
        setState((prevState) => ({ ...prevState, todos: response.data }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, todos: [] }));
        console.log(error);
      });
  }

  function retrieve(id) {
    axios
      .get(`http://127.0.0.1:8000/api/todo/${id}`, { headers })
      .then((response) => {
        setState(() => response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, todos: [] }));
        console.log(error);
      });
  }

  function create(todoData) {
    axios
      .post("http://127.0.0.1:8000/api/todo/", todoData, { headers })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          todos: [...prevState.todos, response.data],
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function remove(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/todo/${id}/`, { headers })
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          todos: prevState.todos.filter((todo) => todo.id !== id),
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function update(id, todoData) {
    axios
      .put(`http://127.0.0.1:8000/api/todo/${id}/`, todoData, {
        headers,
      })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          todos: prevState.todos.map((todo) =>
            todo.id === id ? response.data : todo
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
