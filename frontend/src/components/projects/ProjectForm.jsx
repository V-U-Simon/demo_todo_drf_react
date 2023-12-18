import { useState } from "react";
import useTodo from "../../store/useTodo";
import { apiProjects } from "../../api/apiProjects";
import { FormInput } from "../shared/FormInput";

export function ProjectsForm() {
  const addProject = useTodo((store) => store.addProject);

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  console.log("error", error.data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newProject = {
        title: title,
        isActive: true,
      };
      const data = await apiProjects.create(newProject);
      addProject(data);
    } catch (error) {
      console.error(error);
      setError(error.data);
    }
  };

  return (
    <>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
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
          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
