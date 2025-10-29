import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  // Sample user (in real app, this would come from auth context)
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  };

  // Load cart items from localStorage
  useEffect(() => {
    const userCart = JSON.parse(localStorage.getItem(`cart_${currentUser.id}`)) || [];
    setCartItems(userCart);
    setLoading(false);
  }, [currentUser.id]);

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(updatedCart));
  };

  // Apply coupon
  const applyCoupon = () => {
    const coupons = {
      'WELCOME10': 10,
      'PREMIUM15': 15,
      'FIRE20': 20
    };
    
    if (coupons[couponCode.toUpperCase()]) {
      setDiscount(coupons[couponCode.toUpperCase()]);
    } else {
      alert('Invalid coupon code');
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  // Checkout handler
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    // In a real app, this would redirect to payment processing
    alert('Proceeding to checkout...');
    // navigate('/checkout');
  };

  // Continue shopping
  const continueShopping = () => {
    navigate('/products');
  };

  const DynamicBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-600/5 rounded-full blur-2xl animate-orb-pulse"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen relative overflow-hidden">
      <DynamicBackground />

      {/* Hero Section */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 via-gray-900/80 to-yellow-900/40"></div>
        </div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-orange-600 to-yellow-400 text-white px-8 py-4 rounded-full text-sm font-bold mb-8 shadow-2xl backdrop-blur-sm border border-amber-400/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:20px_20px]"></div>
                <span className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse relative z-10"></span>
                <span className="relative z-10">SHOPPING CART • {cartItems.length} ITEMS</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl font-black tracking-tight">
                  YOUR CART
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
                Review your selected premium lighters and proceed to checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.length === 0 ? (
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-12 border border-gray-700 text-center">
                  <div className="text-6xl mb-6">🛒</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h3>
                  <p className="text-gray-400 text-lg mb-8">
                    Discover our premium collection and find your perfect lighter.
                  </p>
                  <button
                    onClick={continueShopping}
                    className="bg-gradient-to-r from-orange-600 to-yellow-400 hover:from-orange-700 hover:to-yellow-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Cart Items ({cartItems.length})
                    </h2>
                    <button
                      onClick={continueShopping}
                      className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Continue Shopping
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-amber-400/50 transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className={`w-24 h-24 rounded-xl ${item.gradient} flex items-center justify-center border border-gray-600`}>
                            <span className="text-white text-sm font-bold text-center px-2">
                              {item.badge}
                            </span>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer p-1"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Quantity Selector */}
                              <div className="flex items-center border border-gray-600 rounded-xl overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-white hover:bg-gray-700 transition-colors cursor-pointer"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-4 py-1 text-white min-w-12 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-white hover:bg-gray-700 transition-colors cursor-pointer"
                                >
                                  +
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <div className="text-lg font-bold text-white">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                {item.quantity > 1 && (
                                  <div className="text-sm text-gray-400">
                                    ${item.price} each
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Stock Status */}
                            <div className={`text-xs px-2 py-1 rounded-full ${
                              item.stock > 10 
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {item.stock} in stock
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                {/* Pricing Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({discount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-3">
                    <div className="flex justify-between text-lg font-bold text-white">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors duration-300 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full bg-gradient-to-r from-orange-600 to-yellow-400 hover:from-orange-700 hover:to-yellow-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  Proceed to Checkout
                </button>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <div className="flex justify-center space-x-4 text-gray-400">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔒</div>
                      <div className="text-xs">Secure Payment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🚚</div>
                      <div className="text-xs">Free Shipping</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">↩️</div>
                      <div className="text-xs">Easy Returns</div>
                    </div>
                  </div>
                </div>

                {/* Recommended Products */}
                {cartItems.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-600">
                    <h4 className="text-white font-semibold mb-3">You Might Also Like</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">⚡</span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">Electric Pro</div>
                          <div className="text-amber-400 text-sm">$89.99</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">🔥</span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">Fuel Master</div>
                          <div className="text-amber-400 text-sm">$129.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Empty Cart CTA */}
          {cartItems.length === 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="text-white font-semibold mb-2">Electric Lighters</h4>
                <p className="text-gray-400 text-sm mb-4">Modern, rechargeable lighters</p>
                <Link
                  to="/products?filter=electric"
                  className="text-amber-400 hover:text-amber-300 text-sm font-medium cursor-pointer"
                >
                  Explore →
                </Link>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 text-center">
                <div className="text-3xl mb-3">🔥</div>
                <h4 className="text-white font-semibold mb-2">Fuel Lighters</h4>
                <p className="text-gray-400 text-sm mb-4">Classic butane lighters</p>
                <Link
                  to="/products?filter=fuel"
                  className="text-amber-400 hover:text-amber-300 text-sm font-medium cursor-pointer"
                >
                  Explore →
                </Link>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 text-center">
                <div className="text-3xl mb-3">🏛️</div>
                <h4 className="text-white font-semibold mb-2">Vintage Collection</h4>
                <p className="text-gray-400 text-sm mb-4">Timeless classic designs</p>
                <Link
                  to="/products?filter=vintage"
                  className="text-amber-400 hover:text-amber-300 text-sm font-medium cursor-pointer"
                >
                  Explore →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes orb-pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.15; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-orb-pulse {
          animation: orb-pulse 4s ease-in-out infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CartPage;