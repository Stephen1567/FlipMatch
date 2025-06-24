import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './game.css';

// Theme assets
const emojiList = ['💎', '🚀', '🧩', '🎮', '🕹️', '🧠', '🎲 ', '📀', '🪄', '🧱'];
const animalImages = [...Array(10)].map((_, i) => `/animals/a${i + 1}.png`);
const foodImages = [...Array(10)].map((_, i) => `/food/f${i + 1}.png`);
const flipSound = new Audio('/sounds/flip.mp3');

function shuffle(array) {
  return [...array, ...array].sort(() => Math.random() - 0.5);
}

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const { level, theme } = location.state || {};

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startTime] = useState(Date.now());

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize game
  useEffect(() => {
    if (!theme || !level) {
      alert("Missing game configuration. Returning to Home.");
      navigate('/');
      return;
    }

    const getCardSet = () => {
      const count = level === 'easy' ? 6 : level === 'medium' ? 8 : 10;
      if (theme === 'Emojis') return emojiList.slice(0, count);
      if (theme === 'Animals') return animalImages.slice(0, count);
      if (theme === 'Food') return foodImages.slice(0, count);
      return [];
    };

    const newCards = shuffle(getCardSet());
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
  }, [theme, level, navigate]);

  // Navigate to result page if all cards are matched
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      const endTime = Math.floor((Date.now() - startTime) / 1000); // in seconds
      navigate('/result', {
        state: {
          level,
          theme,
          moves,
          time: endTime,
        },
      });
    }
  }, [matched, cards, level, theme, moves, startTime, navigate]);

  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    flipSound.currentTime = 0;
    flipSound.play();

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const columns = Math.ceil(Math.sqrt(cards.length));

  return (
    <div className="container">
      <header className="home-header">
        <div className="logo-container">
          <img className="logo-img" src="IMG/logo.jpeg" alt="FlipMatch Logo" />
        </div>
        <div className="nav-links">
          <div className="nav-item" onClick={() => navigate('/')}>Home</div>
        </div>
      </header>

      <div className="info">
        <p>Matches: {matched.length / 2} / {cards.length / 2}</p>
        <p>Moves: {moves}</p>
        <p>Time: {seconds}s</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {cards.map((value, i) => {
          const isRevealed = flipped.includes(i) || matched.includes(i);
          return (
            <button key={i} className="card" onClick={() => handleClick(i)}>
              {isRevealed ? (
                theme === 'Emojis' ? (
                  <span style={{ fontSize: '48px' }}>{value}</span>
                ) : (
                  <img src={value} alt="card" />
                )
              ) : (
                <img src="IMG/back.jpeg" alt="card back" />
              )}
            </button>
          );
        })}
      </div>

      <button className="cancel" onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
}
