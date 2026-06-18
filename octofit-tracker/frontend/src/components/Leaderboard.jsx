import { useEffect, useState } from 'react';
import { apiBase } from '../App.jsx';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiBase}/leaderboard`)
      .then((res) => res.json())
      .then((data) => setEntries(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || 'Failed to load leaderboard'));
  }, []);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
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
