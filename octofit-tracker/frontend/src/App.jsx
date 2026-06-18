import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home.jsx';
import Users from './components/Users.jsx';
import Teams from './components/Teams.jsx';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const apiBase = `${apiHost}/api`;

export default function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">
            {codespaceName
              ? `Using Codespace API host: ${codespaceName}-8000.app.github.dev`
              : 'No VITE_CODESPACE_NAME set; falling back to localhost.'}
          </p>
          <nav className="nav nav-pills gap-2 flex-wrap">
            <NavLink to="/" className="nav-link" end>
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="/teams" className="nav-link">
              Teams
            </NavLink>
            <NavLink to="/activities" className="nav-link">
              Activities
            </NavLink>
            <NavLink to="/leaderboard" className="nav-link">
              Leaderboard
            </NavLink>
            <NavLink to="/workouts" className="nav-link">
              Workouts
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
