import { useState, memo } from 'react'

// Regular component - will re-render every time parent updates
function RegularChild({ name }: { name: string }) {
  console.log(`Regular component rendered: ${name}`);
  return <div>Regular: {name}</div>;
}

// Memoized component - only re-renders when props change
const MemoizedChild = memo(function MemoizedChild({ name }: { name: string }) {
  console.log(`Memoized component rendered: ${name}`);
  return <div>Memoized: {name}</div>;
});

function MemoExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <div>
      <h3>React.memo Example</h3>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      
      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>
      
      <button onClick={() => setName(name === 'John' ? 'Jane' : 'John')}>
        Change Name
      </button>
      
      <RegularChild name={name} />
      <MemoizedChild name={name} />
    </div>
  );
}

export default MemoExample