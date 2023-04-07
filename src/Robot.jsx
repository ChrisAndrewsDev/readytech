import React, { useState } from 'react';

const Robot = () => {
    // State
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [sucess, setSuccess] = useState('')
  const [facing, setFacing] = useState(null);
  const [error, setError] = useState(null);
  const [robotPlaced, setRobotPlaced] = useState(false);
  const [output, setOutput] = useState(null);
    // Setting bounds of grid
  const isValidPlacement = (x, y) => {
    return x >= 0 && x <= 4 && y >= 0 && y <= 4;
  };
    // Place on grid and facing
  const place = (x, y, facing) => {
    if (isValidPlacement(x, y)) {
      setX(x);
      setY(y);
      setFacing(facing);
      setRobotPlaced(true);
      setError(null);
      setSuccess(true);
    } else {
      setError('Invalid placement');
    }
  };
    // Initial placement before allowing moves
  const move = () => {
    if (!robotPlaced) {
      setError('Robot must be placed before moving!');
      return;
    }

    let newX = x;
    let newY = y;

    switch (facing) {
      case 'NORTH':
        newY++;
        break;
      case 'SOUTH':
        newY--;
        break;
      case 'EAST':
        newX++;
        break;
      case 'WEST':
        newX--;
        break;
        default:
        break;
    }
    // Checking to see if robot exceeds 5x5 grid - SUCCESS
    if (isValidPlacement(newX, newY)) {
      setX(newX);
      setY(newY);
      setError(null);
      setSuccess('Valid Move!')
    } else {
        // Checking to see if robot exceeds 5x5 grid - FAIL
      setError('Invalid move, Robot will go over the edge!');
      setSuccess(null)
    }
  };
    // Turn left
  const left = () => {
    if (!robotPlaced) {
      setError('Robot must be placed before moving!');
      return;
    }

    let newFacing;

    switch (facing) {
      case 'NORTH':
        newFacing = 'WEST';
        break;
      case 'SOUTH':
        newFacing = 'EAST';
        break;
      case 'EAST':
        newFacing = 'NORTH';
        break;
      case 'WEST':
        newFacing = 'SOUTH';
        break;
        default:
        break;
    }

    setFacing(newFacing);
  };
    // Turn right
  const right = () => {
    if (!robotPlaced) {
      setError('Robot must be placed before moving!');
      return;
    }

    let newFacing;

    switch (facing) {
      case 'NORTH':
        newFacing = 'EAST';
        break;
      case 'SOUTH':
        newFacing = 'WEST';
        break;
      case 'EAST':
        newFacing = 'SOUTH';
        break;
      case 'WEST':
        newFacing = 'NORTH';
        break;
        default:
        break;
    }

    setFacing(newFacing);
  };
//   Outputs the current location and facing
  const report = () => {
    if (!robotPlaced) {
      setError('Robot not placed');
      return;
    }
    // Outputs facing on screen
    setOutput(`${x}, ${y}, ${facing}`)
  };

  return (
    <div>
      <h1>Toy Robot Simulator</h1>
      <p>Enter commands to control the robot:</p>
      {error && <div className="error">{error}</div>}
      <p>{sucess}</p>
      {/* Live position tracker */}
      <p>{x},{y},{facing}</p>
      {/* Inital placement at 0, 0, NORTH */}
      <button onClick={() => place(0, 0, 'NORTH')}>Place 0, 0, NORTH</button>
      <button onClick={() => move()}>Move</button>
      <button onClick={() => left()}>Left</button>
      <button onClick={() => right()}>Right</button>
      <button onClick={() => report()}>Report</button>
      {/* Outputs position, facing when "report" click handler is triggered */}
      <p>{output}</p>
    </div>
  );
};

export default Robot;
