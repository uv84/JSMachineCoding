import React from 'react'
import Todos from './Components/Todos'
import { Provider } from 'react-redux'
import { store } from './Store/store'


function Redux() {
  return (
    <Provider store ={store}>
        <Todos/>
    </Provider>
    
  )
}

export default Redux
