import { client } from "./client";

async function fetch() {
  try {
    const response = await client.get("tasks/");
    console.dir(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchByProject(id) {
  try {
    const response = await client.get(`tasks/?project=${id}`);
    console.dir(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function create(taskData) {
  try {
    const response = await client.post("tasks/", taskData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function remove(taskData) {
  try {
    const response = await client.delete(`tasks/${taskData.id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function update(taskData) {
  try {
    const response = await client.put(`tasks/${taskData.id}/`, taskData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const apiTasks = {
  // retrieve,
  fetch,
  fetchByProject,
  create,
  remove,
  update,
};

//   ...prevState,
// tasks: prevState.tasks.map((task) => (task.id === id ? response.data : task)),
