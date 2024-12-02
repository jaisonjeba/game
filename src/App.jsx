import React, { useState, useEffect } from "react";
import "./App.css";

const Game = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [keyword, setKeyword] = useState("");
  const [selectedBox, setSelectedBox] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Game time: 60 seconds
  const [activeBox, setActiveBox] = useState(null); // The box with the keyword

  // Handle clicking on a box
  const handleClick = (index) => {
    if (gameOver) return;

    if (index === activeBox) {
      setScore(score + 5); // Correct answer: +5 points
    } else {
      setScore(score - 2.5); // Missed answer: -2.5 points
    }
    setActiveBox(null); // Hide keyword
  };

  // Function to randomly place the keyword in a box
  const showKeyword = () => {
    const randomIndex = Math.floor(Math.random() * 9);
    setActiveBox(randomIndex);
    setKeyword("HIT"); // Show the keyword
  };

  // Function to start the game
  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setTimeLeft(60);
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else {
        setGameOver(true);
        clearInterval(interval);
      }
    }, 1000);

    const keywordInterval = setInterval(() => {
      showKeyword();
      setTimeout(() => setActiveBox(null), 1000); // Hide the keyword after 1 second
    }, 2000); // Keyword appears every 2 seconds

    return () => {
      clearInterval(interval);
      clearInterval(keywordInterval);
    };
  };

  useEffect(() => {
    if (timeLeft === 60) {
      startGame(); // Start the game when the component mounts
    }
  }, []);

  return (
    <div className="game-container">
      <h1>Keyword Click Game</h1>
      <div className="score-board">
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft} seconds</p>
      </div>
      <div className="game-board">
        {boxes.map((_, index) => (
          <div
            key={index}
            className={`box ${index === activeBox ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            {index === activeBox && <span>{keyword}</span>}
          </div>
        ))}
      </div>
      {gameOver && <div className="game-over">Game Over! Final Score: {score}</div>}
    </div>
  );
};

export default Game;
