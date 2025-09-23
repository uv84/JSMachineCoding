import './App.css'
import FileExp from './components/FileExp'
import MsgContexWrapper from './components/NestedMsg/Context/MsgContex'
import NestedMsg from './components/NestedMsg/NestedMsg'
import FileExplorerContextWrapper from  "./components/context/FileExplorerContext"

function App() {

  return (
    <>
      {/* <FileExplorerContextWrapper>
      <FileExp />
    </FileExplorerContextWrapper> */}
    <MsgContexWrapper>
      <NestedMsg />
    </MsgContexWrapper>
    
    </>
  )
}

export default App
