import { useEffect, useState } from 'react';
import { apiBase } from '../App.jsx';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiBase}/teams`)
      .then((res) => res.json())
      .then((data) => setTeams(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || 'Failed to load teams'));
  }, []);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
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
