import React from 'react';
import { game_backend } from 'declarations/game_backend';
import SnakeGameComponent from './components/snakegmae'; // Import the SnakeGameComponent

function App() {
  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      {/* Replace the form with the SnakeGameComponent */}
      <SnakeGameComponent />
    </main>
  );
}

export default App;
