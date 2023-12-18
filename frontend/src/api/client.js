import axios from "axios";
import useSession from "../store/useSession";
import { isExpired } from "react-jwt";
import { apiAuth } from "./apiAuth";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

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
    console.error(`interceptor.response ${error?.config?.url} (ERROR ${error?.status}):`, error);
    throw error;
  }
);

// перехватываем запрос (request)
instance.interceptors.request.use(async (config) => {
  // извлекаем токена из хранилища (если есть)
  const session = useSession.getState().session;

  if (session?.access && isExpired(session.access)) {
    console.warn("Try to get new access token");
    session.access = await apiAuth.refreshExpiredAccessToken();
    useSession.setState({ session: session });
  }

  if (session?.access) config.headers["Authorization"] = "Bearer " + session.access;
  return config;
});

// перехватываем ответ (response)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // сохраняем оригинальный запрос для обновления в нем токена
    const originRequestConfig = error.config;

    // проверяем:
    if (
      // - что мы не входим в аккаунт
      originRequestConfig.url !== "/auth/login" &&
      // - что ошибка именно в отказе в доступе
      error.response.status === 401
    ) {
      useSession.setState({ session: { user: {} } });
    }

    throw error.response;
  }
);

export { instance as client };
