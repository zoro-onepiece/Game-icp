import React, { useEffect, useState } from 'react';
import { game_backend } from '../../../declarations/game_backend';

const SnakeGameComponent = () => {
  const [gameState, setGameState] = useState(null);
  const [direction, setDirection] = useState('Right');

  useEffect(() => {
    const fetchGameState = async () => {
      const state = await game_backend.move();
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
          game_backend.changeDirection({ Up :null });
          break;
        case 'ArrowDown':
          setDirection('Down');
          game_backend.changeDirection({ Down: null});
          break;
        case 'ArrowLeft':
          setDirection('Left');
          game_backend.changeDirection({ Left: null });
          break;
        case 'ArrowRight':
          setDirection('Right');
          game_backend.changeDirection({ Right:null });
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
      {gameState.gameOver && <button onClick={() => game_backend.reset()}>Play Again</button>}
    </div>
  );
};

export default SnakeGameComponent;
