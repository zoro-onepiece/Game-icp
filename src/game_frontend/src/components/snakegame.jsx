import React, { useEffect, useState } from 'react';
import { snakeGame } from 'path-to-your-motoko-actor';

const SnakeGameComponent = () => {
  const [gameState, setGameState] = useState(null);
  const [direction, setDirection] = useState('Right');

  useEffect(() => {
    const fetchGameState = async () => {
      const state = await snakeGame.move();
      setGameState(state);
    };

    const gameLoop = setInterval(fetchGameState, 200);
    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('Up');
          snakeGame.changeDirection({ direction: 'Up' });
          break;
        case 'ArrowDown':
          setDirection('Down');
          snakeGame.changeDirection({ direction: 'Down' });
          break;
        case 'ArrowLeft':
          setDirection('Left');
          snakeGame.changeDirection({ direction: 'Left' });
          break;
        case 'ArrowRight':
          setDirection('Right');
          snakeGame.changeDirection({ direction: 'Right' });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseMove = (e) => {
    // Implement mouse-based direction change logic here
  };

  if (!gameState) return <div>Loading...</div>;

  return (
    <div onMouseMove={handleMouseMove}>
      <h1>Snake Game</h1>
      <p>Score: {gameState.score}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 20px)' }}>
        {Array.from({ length: 30 }).map((_, y) =>
          Array.from({ length: 30 }).map((_, x) => {
            const isSnake = gameState.snake.some(p => p.x === x && p.y === y);
            const isFood = gameState.food.x === x && gameState.food.y === y;
            const isObstacle = gameState.obstacles.some(p => p.x === x && p.y === y);

            return (
              <div
                key={`${x}-${y}`}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: isSnake ? 'green' : isFood ? 'red' : isObstacle ? 'gray' : 'white',
                  border: '1px solid black',
                }}
              />
            );
          })
        )}
      </div>
      {gameState.gameOver && <button onClick={() => snakeGame.reset()}>Play Again</button>}
    </div>
  );
};

export default SnakeGameComponent;
