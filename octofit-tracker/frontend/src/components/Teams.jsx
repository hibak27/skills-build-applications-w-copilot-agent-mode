import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
    : 'http://localhost:8000/api/teams';

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setTeams(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || 'Failed to load teams'));
  }, [apiUrl]);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <p className="text-muted">Endpoint: {apiUrl}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {teams.map((team) => (
        <div key={team._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{team.name}</h5>
            <p className="card-text">Goals: {team.goals?.join(', ') || 'None'}</p>
            <p className="card-text">Members: {team.members?.map((member) => member.name).join(', ') || 'None'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
