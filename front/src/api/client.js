import axios from "axios";
// import { isExpired } from "react-jwt";
// import { apiAuth } from "./auth";
// import { storage } from "src/shared/store/sessionStorage";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// перехватываем запрос (request)
// instance.interceptors.request.use(async (config) => {
//   // ✊ извлекаем токена из хранилища (если есть)

//   let session = await storage.getSession();
//   // if (session.access && isExpired(token.access)) token = await apiAuth.refreshExpiredAccessToken();
//   if (session.access) config.headers["Authorization"] = "Bearer " + session.access;

//   return config;
// });

/**
 * just logging requests
 */
instance.interceptors.request.use(async (config) => {
  console.debug(`interceptor.request: ${config.url} (MAKE REQUEST)`, config);

  return config;
});

/**
 * just logging responses
 */
instance.interceptors.response.use(
  (response) => {
    console.debug(`interceptor.response: ${response.config.url} (SUCCESS)`);
    return response;
  },
  (error) => {
    console.error(`interceptor.response ${error?.config?.url} (ERROR ${error.status}):`, error);
    throw error;
  }
);

export { instance as client };
