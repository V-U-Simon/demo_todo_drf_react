import axios from "axios";
import useSession from "../store/useSession";
import { client } from "./client";

async function login({ email, password }) {
  console.debug(email, password);
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

async function refreshExpiredAccessToken() {
  console.log("Refreshing");
  try {
    const session = useSession.getState().session;
    const response = await axios.post("http://127.0.0.1:8000/api/auth/refresh/", {
      refresh: session.refresh,
    });

    const access = response.data.access;
    console.warn("Access token is updated", access);
    session.access = access;

    useSession.setState({ session: session });
    return access;
  } catch (error) {
    console.error(error);
    useSession.setState({ session: { user: {} } });
  }
}

export const apiAuth = {
  login,
  refreshExpiredAccessToken,
  registration,
};
