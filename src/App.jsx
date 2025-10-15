import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer'
import Navbar from './components/navbar'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/homepage'
import ProductPage from './pages/productpage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-amber-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Optional: Add a 404 page */}
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App