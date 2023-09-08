import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../dist/output.css";
import AuthProvider from "./components/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
