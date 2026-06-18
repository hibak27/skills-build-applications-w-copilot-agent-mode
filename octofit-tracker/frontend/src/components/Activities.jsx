import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [page] = useState(1);
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities';

  useEffect(() => {
    fetch(`${apiUrl}?page=${page}`)
      .then((res) => res.json())
      .then((data) => setActivities(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || 'Failed to load activities'));
  }, [apiUrl, page]);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <p className="text-muted">Endpoint: {apiUrl}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id} className="list-group-item">
            <strong>{activity.type}</strong> by {activity.user?.name || 'Unknown'}
            <div>Duration: {activity.durationMinutes} min</div>
            <div>Calories: {activity.caloriesBurned}</div>
            <div>Date: {new Date(activity.performedAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
