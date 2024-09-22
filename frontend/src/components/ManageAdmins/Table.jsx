import { useUser } from "../../context/UseUser";
import TableData from "./TableData";
export default function Table() {
  const { admins } = useUser();
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
          {admins &&
            admins.map((admin) => {
              return <TableData admin={admin} key={admin._id} />;
            })}
        </tbody>
      </table>
    </div>
  );
}
