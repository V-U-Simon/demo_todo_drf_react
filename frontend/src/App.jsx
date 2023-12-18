import { useState, useEffect, useContext } from "react";
import { Router } from "./router";

const App = () => {
  // const [token] = useContext(AuthContext);
  // const [state, setState] = useState({
  //   users: [],
  //   projects: [],
  //   tasks: [],
  // });

  // const projectActions = useProjectActions(state, setState);
  // const taskActions = useTodoActions(state, setState);
  // const userActions = useUserActions(state, setState);

  // const isAuth = () => Boolean(token);

  // useEffect(() => {
  //   console.log("state: " + token);
  //   console.log("storage: " + localStorage.getItem("token"));
  //   if (token) {
  //     projectActions.list();
  //     taskActions.list();
  //     userActions.list();
  //   }
  // }, [token]);

  return <Router />;
};

export default App;
