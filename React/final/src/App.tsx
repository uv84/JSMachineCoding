
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Accordian from './components/Accodian/Accordian'
import Feedback from './components/Accodian/Feedback'
import Todo from './components/Todos/Todo'
import TodoLocal from './components/Todos/TodoLocal'
import TodoSession from './components/Todos/TodoSession'
// import StarRating from './StarRating/StarRating'
import Main from "./pages/Main"
import Product from './pages/Product'
import Second from './pages/Second'
import FetchData from './components/fetchData/fetchdata'

function App() {
 

  return (
    <>
      
      {/* <Todo/> */}
      {/* <TodoLocal/> */}
      {/* <TodoSession/> */}
      {/* <Feedback/> */}
      
      {/* <Accordian/> */}
      {/* <StarRating /> */}
      
      
      {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/main' element={<Second/>}></Route>
        <Route path='/main/product' element={<Product/>}></Route>

      </Routes>
      </BrowserRouter> */}
      <FetchData />
    </>
  )
}

export default App


