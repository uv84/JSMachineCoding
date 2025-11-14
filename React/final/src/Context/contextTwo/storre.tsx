import { useReducer } from 'react'

// Define the state type
interface State {
  count: number;
}

// Define action types
type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

// Initial state
const initialState: State = {
  count: 0
};

// Reducer function
function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      return state;
  }
}

function UseReducerExample() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h3>useReducer Counter Example</h3>
      <p>Count: {state.count}</p>
      
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>
      
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Decrement
      </button>
      
      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
      
      <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>
        Set to 10
      </button>
    </div>
  );
}

export default UseReducerExample