import { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../api/userApi';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleUpdate = async () => {
    await updateUser(editUser.id, editUser);
    setEditUser(null);
    loadUsers();
  };

  return (
    <div className="container mt-4">
      <h3>User List</h3>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.age}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditUser(u)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <div className="card p-3 mt-3">
          <h4>Edit User</h4>
          <input className="form-control mb-2" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
          <input className="form-control mb-2" value={editUser.age} onChange={(e) => setEditUser({ ...editUser, age: Number(e.target.value) })} />

          <button className="btn btn-success" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default UserList;
