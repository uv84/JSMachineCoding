import { useState, useMemo } from 'react'

function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  // Expensive calculation WITHOUT useMemo - runs on every render
  const expensiveCalculationBad = () => {
    console.log('🔴 Expensive calculation running (BAD)...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result.toFixed(2);
  };

  // Expensive calculation WITH useMemo - only runs when count changes
  const expensiveCalculationGood = useMemo(() => {
    console.log('🟢 Expensive calculation running (GOOD)...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result.toFixed(2);
  }, [count]); // Only recalculate when count changes

  // Simple calculation that doesn't need useMemo
  const simpleCalculation = count * 2;

  console.log('Component is rendering');

  return (
    <div>
      <h3>useMemo Example</h3>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <p>Simple calculation (count * 2): {simpleCalculation}</p>
      
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setName(name === 'John' ? 'Jane' : 'John')}>Change Name</button>
      
      <hr />
      
      <h4>Without useMemo (runs on every render):</h4>
      <p>Result: {expensiveCalculationBad()}</p>
      
      <h4>With useMemo (only runs when count changes):</h4>
      <p>Result: {expensiveCalculationGood}</p>
    </div>
  );
}

export default UseMemoExample