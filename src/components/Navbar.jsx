import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [cartItems] = useState(3); // Example cart item count

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  // Shopping Cart Icon Component
  const ShoppingCartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  // Handle cart navigation
  const handleCartClick = () => {
    // Navigate to cart page
    // For React Router: navigate('/cart');
    // For hash routing: window.location.hash = 'cart';
    // For simple page: window.location.href = '/cart';
    
    console.log('Navigating to cart page');
    // Add your navigation logic here
  };

  // Handle regular navigation
  const handleNavClick = (itemId) => {
    setActiveLink(itemId);
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-yellow-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-25">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="src\assets\logo.png" 
                alt="logo"
                className="w-full h-20 md:h-20 lg:h-20"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`${
                  activeLink === item.id
                    ? 'text-white bg-orange-500 bg-opacity-20'
                    : 'text-white hover:text-yellow-200 hover:bg-orange-500 hover:bg-opacity-10'
                } px-3 py-2 text-sm font-medium rounded-md transition-all duration-200`}
              >
                {item.label}
              </a>
            ))}
            
            {/* Shopping Cart Icon - Rightmost */}
            <div className="relative ml-4">
              <button
                onClick={handleCartClick}
                className="flex items-center text-white hover:text-yellow-200 hover:bg-orange-500 hover:bg-opacity-20 p-2 rounded-md transition-all duration-200"
              >
                <ShoppingCartIcon />
                {/* Cart Item Count Badge */}
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button and cart icon */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Shopping Cart Icon for Mobile */}
            <div className="relative">
              <button 
                onClick={handleCartClick}
                className="flex items-center text-white hover:text-yellow-200 hover:bg-orange-500 hover:bg-opacity-20 p-2 rounded-md transition-all duration-200"
              >
                <ShoppingCartIcon />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-200 hover:bg-orange-500 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-orange-500 bg-opacity-10 backdrop-blur-sm rounded-lg mt-2 border border-orange-300 border-opacity-20">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`${
                    activeLink === item.id
                      ? 'bg-orange-500 bg-opacity-30 text-white'
                      : 'text-white hover:bg-orange-500 hover:bg-opacity-20'
                  } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Cart Link in Mobile Menu */}
              <button
                onClick={() => {
                  handleCartClick();
                  setIsOpen(false);
                }}
                className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-orange-500 hover:bg-opacity-20 transition-colors duration-200"
              >
                <span>Cart</span>
                {cartItems > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;