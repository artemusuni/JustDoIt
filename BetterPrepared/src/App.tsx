import { Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./External/Login";
import "./App.css";

function App() {
  const location = useLocation(); // Get the current route

  return (
    <div className="welcome-page">
      {/* Welcome Message */}
      {location.pathname === "/" && (
        <div className="welcome-message">
          <h1>Welcome to BetterPrepared!</h1>
          <p>
            Your one-stop solution for staying organized and achieving your
            goals.
          </p>
        </div>
      )}

      {/* Conditionally render the Leaderboard button */}
      {location.pathname !== "/login" && (
        <button className="leaderboard">Leaderboard</button>
      )}

      {/* Login Button */}
      <button className="register-login">
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Login
        </Link>
      </button>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<div />} /> {/* Empty main page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
