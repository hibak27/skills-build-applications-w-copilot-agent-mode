import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
    : 'http://localhost:8000/api/leaderboard';

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setEntries(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || 'Failed to load leaderboard'));
  }, [apiUrl]);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <p className="text-muted">Endpoint: {apiUrl}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold">{entry.user?.name || 'Unknown'}</div>
              <div>{entry.team?.name || 'No team'}</div>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.points} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
