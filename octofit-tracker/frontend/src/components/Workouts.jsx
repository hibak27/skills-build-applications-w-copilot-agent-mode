import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts';

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setWorkouts(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || 'Failed to load workouts'));
  }, [apiUrl]);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <p className="text-muted">Endpoint: {apiUrl}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {workouts.map((workout) => (
        <div key={workout._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{workout.title}</h5>
            <p className="card-text">{workout.description}</p>
            <p className="card-text">Difficulty: {workout.difficulty}</p>
            <p className="card-text">Duration: {workout.durationMinutes} minutes</p>
            <p className="card-text">Recommended for: {workout.recommendedFor?.map((user) => user.name).join(', ') || 'Everyone'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
