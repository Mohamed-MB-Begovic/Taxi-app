import { useUser } from "../../context/UseUser";
import TableData from "./TableData";
export default function Table() {
  const { users } = useUser();
  return (
    <div>
      <table className="table  ">
        <thead>
          <tr>
            <th>Image</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return <TableData user={user} key={user._id} />;
            })}
        </tbody>
      </table>
    </div>
  );
}
