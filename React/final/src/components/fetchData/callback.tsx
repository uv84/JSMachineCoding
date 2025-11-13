import { useState, memo, useCallback } from 'react'

// Child component wrapped with memo
const Child = memo(function Child({ 
  onButtonClick, 
  label 
}: { 
  onButtonClick: () => void;
  label: string;
}) {
  console.log(`Child component "${label}" rendered`);
  return (
    <div>
      <p>Child Component: {label}</p>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
});

function CallbackExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  const [message, setMessage] = useState('');

  // Without useCallback - function is recreated on every render
  const handleClickBad = () => {
    console.log('Button clicked!');
  };

  // With useCallback but empty dependencies - never recreated
  const handleClickEmpty = useCallback(() => {
    console.log('Button clicked!');
  }, []);

  // With useCallback and count dependency - recreated when count changes
  const handleClickWithCount = useCallback(() => {
    console.log(`Button clicked! Count is: ${count}`);
    setMessage(`You clicked when count was ${count}`);
  }, [count]); // Depends on count

  // With useCallback and name dependency - recreated when name changes
  const handleClickWithName = useCallback(() => {
    console.log(`Button clicked! Name is: ${name}`);
    setMessage(`Hello ${name}! Button was clicked.`);
  }, [name]); // Depends on name

  return (
    <div>
      <h3>useCallback with Dependencies Example</h3>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <p>Message: {message}</p>
      
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setName(name === 'John' ? 'Jane' : 'John')}>Change Name</button>
      <button onClick={() => setMessage('')}>Clear Message</button>
      
      <hr />
      
      <h4>No useCallback:</h4>
      <Child onButtonClick={handleClickBad} label="No Callback" />
      
      <h4>useCallback with empty dependencies []:</h4>
      <Child onButtonClick={handleClickEmpty} label="Empty Deps" />
      
      <h4>useCallback with [count] dependency:</h4>
      <Child onButtonClick={handleClickWithCount} label="Count Dep" />
      
      <h4>useCallback with [name] dependency:</h4>
      <Child onButtonClick={handleClickWithName} label="Name Dep" />
    </div>
  );
}

export default CallbackExample