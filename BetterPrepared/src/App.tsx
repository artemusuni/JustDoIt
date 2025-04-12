import React from "react";
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

      {/* Buttons only visible on the main page */}
      {location.pathname === "/" && (
        <div className="button-container">
          <button className="leaderboard">Leaderboard</button>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="register-login">
              Login
            </button>
          </Link>
        </div>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<div />} /> {/* Empty main page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
