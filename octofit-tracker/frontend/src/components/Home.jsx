import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Modern fitness tracking built with React 19, Vite, and a multi-tier API.</p>
      <div className="d-flex gap-2 flex-wrap">
        <Link to="/users" className="btn btn-primary">Users</Link>
        <Link to="/teams" className="btn btn-secondary">Teams</Link>
        <Link to="/activities" className="btn btn-success">Activities</Link>
        <Link to="/leaderboard" className="btn btn-info">Leaderboard</Link>
        <Link to="/workouts" className="btn btn-warning">Workouts</Link>
      </div>
    </div>
  );
}
