import { useState } from "react";
import useTodo from "../../store/useTodo";
import { apiProjects } from "../../api/apiProjects";
import { FormInput } from "../shared/FormInput";

import { ModalComponent } from "../shared/modal";

export function ProjectModalForm(props) {
  const updateProject = useTodo((store) => store.updateProject);

  const [title, setTitle] = useState(props.title);
  const [error, setError] = useState("");

  console.log("error", error.data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedProject = {
        id: props.id,
        title: title,
        isActive: true,
      };
      const data = await apiProjects.update(updatedProject);
      console.log("data", data);
      updateProject(data);
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
          <div className="card-title">Add New Protject</div>
          <FormInput
            type="text"
            name="title"
            placeholder="Название проекта"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onInput={() => setError("")}
            required
            error={error?.title}
          />
          <div className="modal-action form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </ModalComponent>
    </>
  );
}
