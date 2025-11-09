import React from 'react'
import Context from './context'
import StoreProvider from './store'

function ContextExample() {
  return (
    <StoreProvider>
    <Context />
    </StoreProvider>
  )
}

export default ContextExample