import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

import './snakegame.css'

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const maxMoves = Math.sqrt(625)

  const handleKeyPress = (e) => {
    // Handle arrow key presses to control the snake
    switch (e.key) {
      case 'ArrowUp':
        setDirection('UP');
        break;
      case 'ArrowDown':
        setDirection('DOWN');
        break;
      case 'ArrowLeft':
        setDirection('LEFT');
        break;
      case 'ArrowRight':
        setDirection('RIGHT');
        break;
      default:
        break;
    }
  };

  const moveSnake = () => {
    // Move the snake in the current direction
    let newSnake = [...snake];
    let head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y = (head.y - 1 + maxMoves) % maxMoves;
        break;
      case 'DOWN':
        head.y = (head.y + 1) % maxMoves;
        break;
      case 'LEFT':
        head.x = (head.x - 1 + maxMoves) % maxMoves;
        break;
      case 'RIGHT':
        head.x = (head.x + 1) % maxMoves;
        break;
      default:
        break;
    }

    newSnake.unshift(head);

    // Check for collisions with the food
    if (head.x === food.x && head.y === food.y) {
      // Generate new food at random position
      setFood({ x: Math.floor(Math.random() * maxMoves), y: Math.floor(Math.random() * maxMoves) });
    } else {
      // Remove the last segment if no collision with food
      newSnake.pop();
    }

    // Check for collisions with the walls or itself
    if (checkCollision(newSnake)) {
      // Game over logic, reset the game
      setSnake([{ x: 10, y: 10 }]);
      setFood({ x: 5, y: 5 });
      setDirection('RIGHT');
    } else {
      // Update the snake state
      setSnake(newSnake);
    }
  };

  const checkCollision = (snake) => {
    // Check if the snake collides with the walls or itself
    const head = snake[0];
    return (
      head.x < 0 || head.x >= maxMoves || head.y < 0 || head.y >= maxMoves || checkSelfCollision(snake)
    );
  };

  const checkSelfCollision = (snake) => {
    // Check if the snake collides with itself
    const head = snake[0];
    return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
  };

  useEffect(() => {
    // Add event listener for key presses
    window.addEventListener('keydown', handleKeyPress);

    // Set up the game loop
    const gameLoop = setInterval(() => {
      moveSnake();
    }, 100);

    // Clean up event listener and game loop on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameLoop);
    };
  }, [snake, direction]);
  console.log(snake)
  return (
    <div>
    
    <Stage width={625} height={625} className='stage-cotainer'>
      <Layer className="layer">
        {/* Render the snake */}
        {snake.map((segment, index) => (
          <Rect
            key={index}
            x={segment.x * maxMoves}
            y={segment.y * maxMoves}
            width={maxMoves}
            height={maxMoves}
            fill={index? 'green' : "yellow"}
          />
        ))}

        {/* Render the food */}
        <Rect x={food.x * maxMoves} y={food.y * maxMoves} width={maxMoves} height={maxMoves} fill="red" />
      </Layer>
    </Stage>
    </div>
  );
};

export default SnakeGame;
