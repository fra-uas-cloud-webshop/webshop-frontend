import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  // Access state from Redux
  const count = useSelector((state) => state.count);

  // Dispatch actions
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};

export default Counter;
