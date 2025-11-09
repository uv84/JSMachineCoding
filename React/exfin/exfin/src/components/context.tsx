import { useContext } from "react"
import { storeContext } from "./store"

function Context() {
  const context = useContext(storeContext)
  
  // Handle case where context might be null
  if (!context) {
    throw new Error('Context must be used within a StoreProvider')
  }
  
  const { values, addValue } = context

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Context Example</h3>
      <p>Count: {values}</p>
      <button onClick={() => addValue(2)}>
        Add 2
      </button>
      <button 
        onClick={() => addValue(5)}
        style={{ marginLeft: '10px' }}
      >
        Add 5
      </button>
      <button 
        onClick={() => addValue(-1)}
        style={{ marginLeft: '10px' }}
      >
        Subtract 1
      </button>
    </div>
  )
}

export default Context