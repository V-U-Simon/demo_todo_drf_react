import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ToDoForm({ createToDo, projects, users }) {
  const [description, setDescription] = useState("");
  const [project, setProject] = useState();
  const [user, setUser] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    createToDo({
      description: description,
      project: project,
      users: user,
      deadline: deadline,
      isActive: true,
    });
    navigate("/todos");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white rounded-xl shadow-lg"
    >
      <div>
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="description"
        >
          Описание задачи
        </label>
        <textarea
          name="description"
          placeholder="Описание задачи"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="project"
        >
          Проект
        </label>
        <select
          name="project"
          value={project}
          onChange={(event) => setProject(event.target.value)}
          required
          className="input input-bordered w-full"
        >
          <option value="" disabled>
            Выберите проект
          </option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="users">
          Пользователи
        </label>
        <select
          name="users"
          value={user}
          onChange={(event) => setUser(event.target.value)}
          required
          className="input input-bordered w-full"
        >
          <option value="" disabled>
            Выберите пользователя
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.user}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="deadline"
        >
          Дэдлайн
        </label>
        <input
          type="date"
          name="deadline"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </div>
    </form>
  );
}
