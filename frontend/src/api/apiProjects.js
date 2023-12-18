import { client } from "./client";

async function fetch() {
  try {
    const response = await client.get("projects/");
    console.dir(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function create(projectData) {
  try {
    const response = await client.post("projects/", projectData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function remove(projectData) {
  try {
    const response = await client.delete(`projects/${projectData.id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function update(projectData) {
  try {
    const response = await client.put(`projects/${projectData.id}/`, projectData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const apiProjects = {
  // retrieve,
  fetch,
  create,
  remove,
  update,
};

//   ...prevState,
// projects: prevState.projects.map((project) => (project.id === id ? response.data : project)),
