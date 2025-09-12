
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Page1 from './Pages/Page1'
import Page2 from './Pages/Page2'
import Breadcrumb from './components/Breadcrumb'

function App() {

  return (
    <>
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/page1' element={<Page1 />} />
        <Route path='/page1/page2' element={<Page2 />} />
      </Routes>
    </>
  )
}

export default App
