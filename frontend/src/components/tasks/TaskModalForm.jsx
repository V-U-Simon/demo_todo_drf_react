import { useState } from "react";
import useTodo from "../../store/useTodo";
import { apiTasks } from "../../api/apiTasks";
import { FormInput } from "../shared/FormInput";

import { ModalComponent } from "../shared/modal";

export function TaskModalForm(props) {
  const updateTask = useTodo((store) => store.updateTask);

  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedTask = {
        id: props.id,
        title: title,
        description: description,
        isActive: true,
      };
      const data = await apiTasks.update(updatedTask);
      console.log("data", data);
      updateTask(data);
      document.getElementById(props.id).close();
    } catch (error) {
      console.error(error);
      setError(error.data);
    }
  };

  // method="dialog"

  // <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"></div>
  return (
    <>
      <ModalComponent {...props} btnName="update">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <form method="dialog" className="card-body" onSubmit={handleSubmit}>
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
          <div className="modal-action form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </ModalComponent>
    </>
  );
}
