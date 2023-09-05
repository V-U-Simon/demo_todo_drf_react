export default function ToDoList({ todos }) {
  return (
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
          <ToDoItem key={index} todo={todo} />
        ))}
      </tbody>
    </table>
  );
}

const ToDoItem = ({ todo }) => {
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
    </tr>
  );
};
