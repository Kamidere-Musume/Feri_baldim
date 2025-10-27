import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import ProductPage from './pages/productpage'
import ProductDetails from './pages/ProductDetails'
import HomePage from './pages/HomePage'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import RegisterPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <div className="min-h-screen bg-amber-50">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
           <Route path="/product/:id" element={<ProductDetails/>} />
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