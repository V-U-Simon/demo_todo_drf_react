import { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => {
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
      })
      .catch((error) => console.log(error));
  }, []); // Пустой массив зависимостей означает, что этот эффект будет выполнен только один раз при монтировании компонента

  return (
    <div>
      <p>Menu</p>
      <p>Content</p>
      <UserList users={users} />
      <p>Footer</p>
    </div>
  );
};

export default App;
