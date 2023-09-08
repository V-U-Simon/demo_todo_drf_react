import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectsForm({ createProject }) {
  const [name, setName] = useState("");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject({
      name: name,
      repositoryUrl: repositoryUrl,
      isActive: true,
    });
    navigate("/projects");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white rounded-xl shadow-lg"
    >
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Название проекта
        </label>
        <input
          type="text"
          name="name"
          placeholder="Название проекта"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="repository_url"
        >
          URL на GitHub
        </label>
        <input
          type="text"
          name="repository_url"
          placeholder="URL на GitHub"
          value={repositoryUrl}
          onChange={(event) => setRepositoryUrl(event.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );
}
