import './App.css'
import Dashboard from './pages/Dashboard' 
import Header from './pages/Header'
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <Dashboard />
      </div>
  )
}

export default App
