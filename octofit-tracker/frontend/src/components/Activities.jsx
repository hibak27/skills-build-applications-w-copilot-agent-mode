import { useEffect, useState } from 'react';
import { apiBase } from '../App.jsx';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [page] = useState(1);

  useEffect(() => {
    fetch(`${apiBase}/activities?page=${page}`)
      .then((res) => res.json())
      .then((data) => setActivities(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || 'Failed to load activities'));
  }, [page]);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
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
