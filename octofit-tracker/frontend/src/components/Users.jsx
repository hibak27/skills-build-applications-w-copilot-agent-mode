import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [page] = useState(1);
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
    : 'http://localhost:8000/api/users';

  useEffect(() => {
    fetch(`${apiUrl}?page=${page}`)
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || 'Failed to load users'));
  }, [apiUrl, page]);

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <p className="text-muted">Endpoint: {apiUrl}</p>
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
