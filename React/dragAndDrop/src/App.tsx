// import DragAndDrop from "./components/DragAndDrop"

import Hero from "./components/Hero"
import Nav from "./components/nav"


function App() {
//   const initialData = {
//   Todo: [
//     "Design UI mockups",
//     "Set up project repository",
//     "Write unit test",
//     "Integrate payment gateway",
//   ],
//   "In Progress": ["Develop authentication flow", "Implement responsive design"],
//   Completed: [
//     "Set up CI/CD pipeline",
//     "Conduct code reviews",
//     "Deploy initial version to staging",
//   ],
// };

  return (
    <>
      {/* <DragAndDrop initialState={initialData} /> */}
      <Nav />
      <Hero />
    </>
  )
}

export default App
