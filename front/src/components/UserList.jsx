export default function UserList({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User Name</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
}

const UserItem = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
    </tr>
  );
};
