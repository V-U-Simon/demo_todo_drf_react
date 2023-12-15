import useTodo from "../../store/useTodo";
import { apiTasks } from "../../api/apiTasks";

export function DeleteTaskButton(props) {
  const deleteTask = useTodo((store) => store.deleteTask);
  async function handleDelete() {
    try {
      await apiTasks.remove(props);
      deleteTask(props);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button className="btn btn-warning" onClick={handleDelete}>
      {props.children}
    </button>
  );
}
