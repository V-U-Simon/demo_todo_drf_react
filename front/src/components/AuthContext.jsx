import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);
export const isAuth = null;

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log("AuthProvider works: " + token);

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
}

export function useHeaders() {
  const [token] = useContext(AuthContext);
  if (token) {
    return {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    };
  }
  return {
    "Content-Type": "application/json",
  };
}
