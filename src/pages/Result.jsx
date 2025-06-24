import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, level, moves, time } = location.state || {};

  const totalPairs = level === 'easy' ? 6 : level === 'medium' ? 8 : 10;
  const misses = moves - totalPairs;

  if (!theme || !level || moves === undefined || time === undefined) {
    return (
      <div className="container">
        <p>Missing game result data. Redirecting to Home...</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header (same as Game/Home) */}
      <header className="home-header">
        <div className="logo-container">
          <img className="logo-img" src="IMG/logo.jpeg" alt="FlipMatch Logo" />
        </div>
        <div className="nav-links">
          <div className="nav-item" onClick={() => navigate('/')}>Home</div>
        </div>
      </header>

      {/* Result section */}
      <div className="result-page">
        <h1 className="result-title"> Well Done!</h1>
        <p className="result-subtitle">You crushed it.</p>

        <div className="result-cards">
          <div className="result-card">
            <p>Time</p>
            <h2>{time}s</h2>
          </div>
          <div className="result-card">
            <p>Moves</p>
            <h2>{moves}</h2>
          </div>
          <div className="result-card">
            <p>Misses</p>
            <h2>{misses}</h2>
          </div>
        </div>

        {/* Buttons */}
        <div className="result-buttons">
          <button
            className="btn yellow"
            onClick={() => navigate('/game', { state: { theme, level } })}
          >
            Rematch
          </button>
          <button
            className="btn white"
            onClick={() => navigate('/')}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
