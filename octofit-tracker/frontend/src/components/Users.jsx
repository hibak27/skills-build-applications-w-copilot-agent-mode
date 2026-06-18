import { useEffect, useState } from 'react';
import { apiBase } from '../App.jsx';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [page] = useState(1);

  useEffect(() => {
    fetch(`${apiBase}/users?page=${page}`)
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || 'Failed to load users'));
  }, [page]);

  return (
    <div className="container py-4">
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {users.map((user) => (
          <div key={user._id} className="list-group-item">
            <strong>{user.name}</strong> <span className="text-muted">({user.role})</span>
            <div>{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
