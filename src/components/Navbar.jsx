import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [cartItems] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const ShoppingCartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const handleCartClick = () => {
    console.log('Navigating to cart page');
  };

  const handleNavClick = (itemId) => {
    setActiveLink(itemId);
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-700' 
        : 'bg-gradient-to-r from-orange-500 to-yellow-400 shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="src/assets/logo.png" 
                alt="Premium Lighters"
                className="h-16 w-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Brand Name */}
            <div className="hidden lg:block ml-4">
              <div className={`font-serif text-xl font-bold tracking-wider ${
                isScrolled ? 'text-white' : 'text-white'
              }`}>Feri Baldim</div>
              <div className={`text-xs tracking-widest ${
                isScrolled ? 'text-gray-300' : 'text-orange-100'
              }`}>PREMIUM LIGHTERS</div>
            </div>
          </div>

          {/* Desktop Navigation - Simple Line Hover */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-2 px-4 font-medium transition-all duration-300 group ${
                  isScrolled ? 'text-gray-300' : 'text-white'
                } ${
                  activeLink === item.id
                    ? isScrolled 
                      ? 'text-orange-400'
                      : 'text-white'
                    : ''
                }`}
              >
                {/* Main Text */}
                <span className="relative z-10 tracking-wide">
                  {item.label}
                </span>
                
                {/* Simple Line Animation */}
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transform origin-left scale-x-0 transition-transform duration-300 ${
                  activeLink === item.id ? 'scale-x-100' : 'group-hover:scale-x-100'
                }`}></div>
                
                {/* Subtle Background Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/0 to-yellow-400/0 rounded-lg transition-all duration-300 ${
                  activeLink === item.id 
                    ? 'from-orange-500/5 to-yellow-400/5' 
                    : 'group-hover:from-orange-500/5 group-hover:to-yellow-400/5'
                }`}></div>
              </a>
            ))}
            
            {/* Cart Button */}
            <div className="relative pl-8 ml-8 border-l border-gray-600/50">
              <button
                onClick={handleCartClick}
                className={`flex items-center space-x-2 py-2 px-4 transition-all duration-300 rounded-lg group relative ${
                  isScrolled 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-white hover:text-white'
                }`}
              >
                {/* Cart Icon */}
                <ShoppingCartIcon />
                
                {/* Cart Text */}
                <span className="font-medium text-sm">Cart</span>
                
                {/* Cart Count - Simple Badge */}
                {cartItems > 0 && (
                  <span className={`absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded font-medium ${
                    isScrolled 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-orange-600'
                  }`}>
                    {cartItems}
                  </span>
                )}
                
                {/* Line Animation for Cart */}
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100`}></div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Mobile Cart */}
            <div className="relative">
              <button 
                onClick={handleCartClick}
                className={`flex items-center space-x-2 py-2 px-3 transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-white hover:text-white'
                }`}
              >
                <ShoppingCartIcon />
                <span className="text-sm font-medium">Cart</span>
                {cartItems > 0 && (
                  <span className={`absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded font-medium ${
                    isScrolled 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-orange-600'
                  }`}>
                    {cartItems}
                  </span>
                )}
              </button>
            </div>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-3 focus:outline-none transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-300 hover:text-white'
                  : 'text-white hover:text-white'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className={`px-4 pt-4 pb-6 space-y-3 rounded-2xl mt-2 border backdrop-blur-xl ${
              isScrolled
                ? 'bg-gray-900/95 border-gray-700 shadow-2xl'
                : 'bg-orange-500/95 border-orange-300 shadow-lg'
            }`}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 group ${
                    activeLink === item.id
                      ? isScrolled
                        ? 'text-orange-400'
                        : 'text-white'
                      : isScrolled
                      ? 'text-gray-300 hover:text-orange-400'
                      : 'text-white/95 hover:text-white'
                  }`}
                >
                  <span className="tracking-wide">{item.label}</span>
                  <svg 
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      activeLink === item.id ? 'rotate-90 text-orange-400' : 'group-hover:translate-x-1'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
              
              {/* Mobile Cart Item */}
              <button
                onClick={() => {
                  handleCartClick();
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 group ${
                  isScrolled
                    ? 'text-gray-300 hover:text-orange-400'
                    : 'text-white/95 hover:text-white'
                }`}
              >
                <span>Cart</span>
                {cartItems > 0 && (
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    isScrolled 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-orange-600'
                  }`}>
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