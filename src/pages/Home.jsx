import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [theme, setTheme] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate(); // initialize navigation

  const handleStart = () => {
    if (!level || !theme) {
      alert("Please select a level and theme.");
      return;
    }

    navigate("/game", { state: { level, theme } });
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="logo-container">
          <img className="logo-img" src="IMG/logo.jpeg" alt="FlipMatch Logo" />
        </div>
        <div className="nav-links">
          <div className="nav-item">Home</div>
        </div>
      </header>

      {/* Main Section */}
      <main className="home-main">
        <img className="center-logo" src={logo} alt="FlipMatch Main Logo" />
        <div className="intro-text">Ready to train your memory?</div>

        {/* Level Selector */}
        <div className="selector-container">
          <div className="level-select-box">
            <select
              className="level-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Theme Buttons */}
        <div className="theme-buttons">
          {['Animals', 'Emojis', 'Food'].map((option) => (
            <div
              key={option}
              className={`theme-btn ${theme === option ? "selected" : ""}`}
              onClick={() => setTheme(option)}
            >
              {option}
            </div>
          ))}
        </div>

        {/* Start Game Button */}
        <div className="start-button-section">
          <button className="start-btn" onClick={handleStart}>
            Start Game
          </button>
        </div>
      </main>
    </div>
  );
}
