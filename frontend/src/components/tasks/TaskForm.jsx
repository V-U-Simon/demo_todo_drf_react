import { useState } from "react";
import useTodo from "../../store/useTodo";
import { apiTasks } from "../../api/apiTasks";
import { FormInput } from "../shared/FormInput";

export function TaskForm({ project }) {
  const addTask = useTodo((store) => store.addTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTask = {
        title: title,
        description: description,
        isActive: true,
        project: project,
      };
      const data = await apiTasks.create(newTask);
      addTask(data);
    } catch (error) {
      console.error(error);
      setError(error.data);
    }
  };

  return (
    <>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="card-title">Add New Task</div>
          <FormInput
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onInput={() => setError("")}
            required
            error={error?.title}
          />
          <textarea
            name="description"
            className="textarea textarea-bordered"
            placeholder="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            onInput={() => setError("")}
            required></textarea>
          {error?.description && (
            <div className="label">
              <span className="label-text-alt text-error">{error?.description}</span>
            </div>
          )}

          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
