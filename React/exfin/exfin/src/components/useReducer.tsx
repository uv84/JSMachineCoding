

import { useReducer } from 'react'

// Define the state type
interface State {
  count: number
}

// Define action types with payload examples
type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'ADD'; payload: number }           // Payload: number to add
  | { type: 'SET_VALUE'; payload: number }     // Payload: specific value to set
  | { type: 'MULTIPLY'; payload: number }      // Payload: number to multiply by

// Reducer function
function counterReducer(state: State, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    case 'ADD':
      return { count: state.count + action.payload }        // Use payload to add specific amount
    case 'SET_VALUE':
      return { count: action.payload }                      // Set count to payload value
    case 'MULTIPLY':
      return { count: state.count * action.payload }        // Multiply count by payload
    default:
      return state
  }
}

function UseReducerExample() {
  // Initialize useReducer with reducer function and initial state
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>useReducer Counter Example</h2>
      <h3>Count: {state.count}</h3>
      
      {/* Basic actions without payload */}
      <div style={{ gap: '10px', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>
          Increment (+1)
        </button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>
          Decrement (-1)
        </button>
        <button onClick={() => dispatch({ type: 'RESET' })}>
          Reset
        </button>
      </div>

      {/* Actions with payload examples */}
      <div style={{ gap: '10px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => dispatch({ type: 'ADD', payload: 5 })}>
          Add 5
        </button>
        <button onClick={() => dispatch({ type: 'ADD', payload: 10 })}>
          Add 10
        </button>
        <button onClick={() => dispatch({ type: 'SET_VALUE', payload: 100 })}>
          Set to 100
        </button>
        <button onClick={() => dispatch({ type: 'MULTIPLY', payload: 2 })}>
          Multiply by 2
        </button>
        <button onClick={() => dispatch({ type: 'MULTIPLY', payload: 3 })}>
          Multiply by 3
        </button>
      </div>
      
      <p style={{ marginTop: '20px', color: '#666' }}>
        Try the payload examples: Add specific amounts, set exact values, or multiply!
      </p>
    </div>
  )
}

export default UseReducerExample