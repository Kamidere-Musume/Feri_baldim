
import './App.css'
import Footer from './components/footer'
import Navbar from './components/navbar'
import HomePage from './pages/homepage'
function App() {
  return (
    <div className="min-h-screen bg-amber-50"> {/* Tailwind's beige color */}
      <Navbar/>
      <HomePage/>
      <Footer />
    </div>
  )
}

export default App
