import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./External/Login";
import Register from "./External/Register";
import Leaderboard from "./External/Leaderboard"; // Import Leaderboard
import "./App.css";

function App() {
  const location = useLocation(); // Get the current route

  return (
    <div className="welcome-page">
      {/* Welcome Section with Images */}
      {location.pathname === "/" && (
<<<<<<< HEAD
        <div className="welcome-container">
          <img src="/public/shield.png" alt="Shield Icon" className="picture" />
          <div className="welcome-message">
            <h1>Welcome to BetterPrepared!</h1>
            <p>Empowering Security in the Business World.</p>
            <p>
              Welcome to Better Prepared, your trusted platform for enhancing
              cybersecurity through human-focused insights!
            </p>
            <p>
              Our dashboard empowers companies to assess and improve their
              workforce’s security awareness, showcasing a public security
              score—calculated from employee and manager averages—for
              transparent collaboration.
            </p>
            <p>
              Employees can view their individual scores, opt to share them
              publicly to boost their professional value, and access
              personalized training to strengthen their skills.
            </p>
            <p>
              Log in securely to explore your cybersecurity metrics, drive
              accountability, and build trust in a connected world—all from one
              intuitive hub.
            </p>
          </div>
          <img src="/public/shield.png" alt="Shield Icon" className="picture" />
=======
        <div className="welcome-message">
          <h1>Welcome to BetterPrepared!</h1>
          <p>
            Empowering Smarter Security Choices
          </p>
>>>>>>> fb5cfcd85cccaa506b273c834f8df2a06522d7da
        </div>
      )}

      {/* Buttons only visible on the main page */}
      {location.pathname === "/" && (
        <div className="button-container">
          <button
            className="leaderboard"
            onClick={() => (window.location.href = "/leaderboard")}
          >
            Leaderboard
          </button>
          <button
            className="register-login"
            onClick={() => (window.location.href = "/login")}
          >
            Login/Register
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<div />} /> {/* Empty main page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />{" "}
        {/* Leaderboard route */}
      </Routes>
    </div>
  );
}

export default App;
