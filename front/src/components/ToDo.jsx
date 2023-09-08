import ToDoForm from "./TodoForm";

export default function ToDoList({ todos, todoActions, projects, users }) {
  return (
    <>
      <ToDoForm
        props={todos}
        createToDo={todoActions.create}
        projects={projects}
        users={users}
      />

      <table>
        <thead>
          <tr>
            <th>Проект</th>
            <th>Описание</th>
            <th>Поставлено от</th>
            <th>Участники</th>
            <th>Создано</th>
            <th>Обновлено</th>
            <th>Активно</th>
            <th>Срок задачи</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <ToDoItem key={index} todo={todo} removeToDo={todoActions.remove} />
          ))}
        </tbody>
      </table>
    </>
  );
}

const ToDoItem = ({ todo, removeToDo }) => {
  return (
    <tr>
      <td>{todo.project}</td>
      <td>{todo.description}</td>
      <td>{todo.created_by}</td>
      <td>{todo.users}</td>
      <td>{todo.created}</td>
      <td>{todo.updated}</td>
      <td>{todo.is_active}</td>
      <td>{todo.deadline}</td>
      <td>
        <button
          className="brn text-red-600"
          onClick={(event) => removeProject(todo.id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};
