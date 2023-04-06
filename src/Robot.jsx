import React, { useState } from 'react';

const Robot = () => {
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [sucess, setSuccess] = useState('')
  const [facing, setFacing] = useState(null);
  const [error, setError] = useState(null);
  const [robotPlaced, setRobotPlaced] = useState(false);
  const [output, setOutput] = useState(null);

  const isValidPlacement = (x, y) => {
    return x >= 0 && x <= 5 && y >= 0 && y <= 5;
  };

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
      console.log('Invalid Placement!')
    }
  };

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

    if (isValidPlacement(newX, newY)) {
      setX(newX);
      setY(newY);
      setError(null);
      setSuccess('Valid Move!')
    } else {
      setError('Invalid move, Robot will go over the edge!');
      setSuccess(null)
    }
  };

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

  const report = () => {
    if (!robotPlaced) {
      setError('Robot not placed');
      return;
    }
    console.log(`${x}, ${y}, ${facing}`);
    setOutput(`${x}, ${y}, ${facing}`)
  };

  return (
    <div>
      <h1>Toy Robot Simulator</h1>
      <p>Enter commands to control the robot:</p>
      {error && <div className="error">{error}</div>}
      <p>{sucess}</p>
      <p>{x},{y},{facing}</p>
      <button onClick={() => place(0, 0, 'NORTH')}>Place 0, 0, NORTH</button>
      <button onClick={() => move()}>Move</button>
      <button onClick={() => left()}>Left</button>
      <button onClick={() => right()}>Right</button>
      <button onClick={() => report()}>Report</button>
      <p>{output}</p>
    </div>
  );
};

export default Robot;
