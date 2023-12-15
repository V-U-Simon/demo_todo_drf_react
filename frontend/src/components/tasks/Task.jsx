import { useParams } from "react-router-dom";
import TaskForm from "./123";

export function TaskList() {
  const { project } = useParams();
  return (
    <>
      <h1>Task List</h1>
      {JSON.stringify(project)}
      <h1>Task List</h1>
    </>
  );
}
// export function TaskList({ tasks, taskActions, projects, users }) {
//   return (
//     <>
//       <TaskForm props={tasks} createTask={taskActions.create} projects={projects} users={users} />

//       <table>
//         <thead>
//           <tr>
//             <th>Проект</th>
//             <th>Описание</th>
//             <th>Поставлено от</th>
//             <th>Участники</th>
//             <th>Создано</th>
//             <th>Обновлено</th>
//             <th>Активно</th>
//             <th>Срок задачи</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task, index) => (
//             <TaskItem key={index} task={task} removeTask={taskActions.remove} />
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// const TaskItem = ({ task, removeTask }) => {
//   return (
//     <tr>
//       <td>{task.project}</td>
//       <td>{task.description}</td>
//       <td>{task.created_by}</td>
//       <td>{task.users}</td>
//       <td>{task.created}</td>
//       <td>{task.updated}</td>
//       <td>{task.is_active}</td>
//       <td>{task.deadline}</td>
//       <td>
//         <button className="brn text-red-600" onClick={(event) => removeProject(task.id)}>
//           delete
//         </button>
//       </td>
//     </tr>
//   );
// };
