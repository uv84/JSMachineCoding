import UserList from './components/UserList'
import UserCard from './components/UserCard'
import AddUserForm from './components/AddUserForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Redux Saga User Manager</h1>
        <p className="app-subtitle">A simple application demonstrating Redux Saga with TypeScript</p>
      </header>
      
      <main className="app-main">
        <AddUserForm />
        <UserList />
        <UserCard />
      </main>
    </div>
  )
}

export default App
