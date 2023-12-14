// import axios from "axios";
import { client } from "./client";

async function login({ email, password }) {
  const response = await client.post("auth/login/", {
    email: email,
    password: password,
  });
  return response?.data;
}

async function registration({ username, email, password }) {
  const response = await client.post("auth/register/", {
    email: email,
    password: password,
    username: username,
  });
  return response?.data;
}

// async function refreshExpiredAccessToken() {
//   const session = await storage.getSession();
//   // const response = await client.post("auth/refresh/", {
//   const response = await axios.post("http://127.0.0.1:8000/api/auth/refresh/", {
//     refresh: session.refresh,
//   });

//   const access = response.data.access;
//   console.warn("Access token is updated", access);
//   storage.setSession({ ...session, access });
//   return access;
// }

export const apiAuth = {
  login,
  //   refreshExpiredAccessToken,
  registration,
};
