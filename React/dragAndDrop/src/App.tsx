import Contexapi from "./components/Contex/contexapi";
import DragAndDrop from "./components/DragAndDrop"

// import Confirmation from "./components/ConfirmationModel/Confirmation"
import Otp from "./components/Otp/Otp"

// import Hero from "./components/Hero"
// import Nav from "./components/nav"
// import { ThemeProvider } from  "./components/Contex/ThemeContext";
 import Stepper from "./components/Stepper/stepper";
 import TypeAhead from "./components/TypeAhead/TypeAhead";
// import Toasts from "./components/Toasts/Toasts";
import FileExp from "./components/FileExplorer.tsx/FileExp";
import FileExplorerContextWrapper from "./components/FileExplorer.tsx/Contex/FileExplorerContextWrapper";
import Motion from "./components/Motion/Motion";


function App() {
//   const initialData = {
//   Todo: [
//     "Design UI mockups",
//     "Set up project repository",
//     "Write unit test",
//     "Integrate payment gateway",
//   ],
//   InProgress: [
//     "Develop authentication flow", 
//     "Implement responsive design"
//   ],
//   Completed: [
//     "Set up CI/CD pipeline",
//     "Conduct code reviews",
//     "Deploy initial version to staging",
//   ],
// };

  return (
    <>
      {/* <DragAndDrop initialState={initialData} /> */}
      {/* <Nav />
      <Hero /> */}
      {/* <Confirmation /> */}
      {/* <Otp  /> */}
      {/* <ThemeProvider><Contexapi/></ThemeProvider> */}
      {/* <Stepper/> */}

      {/* <TypeAhead /> */}
      

       {/* <Toasts /> */}
       <FileExplorerContextWrapper><FileExp /></FileExplorerContextWrapper>
       {/* <Motion /> */}
       
    </>
  )
}

export default App
