import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    name: '',
    email: ''
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add to cart function
  const addToCart = (product, quantity = 1) => {
    // Get current user (in real app, this would come from auth context)
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    };

    // Get existing cart or initialize empty array
    const userCart = JSON.parse(localStorage.getItem(`cart_${currentUser.id}`)) || [];
    
    // Check if product already exists in cart
    const existingItem = userCart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity if item exists
      const updatedCart = userCart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(updatedCart));
    } else {
      // Add new item to cart
      const newItem = {
        ...product,
        quantity: quantity,
        addedAt: new Date().toISOString()
      };
      const updatedCart = [...userCart, newItem];
      localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(updatedCart));
    }

    // Show success message
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  // Sample product images for slideshow
  const productImages = [
    'https://images.unsplash.com/photo-1581093458791-8a6b6d47d0b9?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1581093458248-bae585bc58c4?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1581093458701-6de10c6a9b12?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1581093459166-a8e8c84c5dc9?w=500&h=500&fit=crop'
  ];

  // Sample reviews data
  const sampleReviews = [
    {
      id: 1,
      name: 'John Smith',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent quality! The lighter works perfectly and has a premium feel. The flame adjustment is very precise.',
      verified: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great product, but the fuel capacity could be better. Overall very satisfied with the purchase.',
      verified: true
    },
    {
      id: 3,
      name: 'Mike Chen',
      rating: 5,
      date: '2024-01-08',
      comment: 'Absolutely love this lighter! The design is stunning and it works flawlessly. Highly recommended!',
      verified: false
    }
  ];

  // Generate product details based on ID
  useEffect(() => {
    const generateProductDetails = () => {
      const productTypes = [
        { type: 'electric', badge: 'Electric', gradient: 'from-blue-500/20 to-purple-600/20' },
        { type: 'fuel', badge: 'Fuel', gradient: 'from-red-500/20 to-orange-600/20' },
        { type: 'vintage', badge: 'Vintage', gradient: 'from-amber-500/20 to-yellow-600/20' },
        { type: 'standard', badge: 'Standard', gradient: 'from-gray-500/20 to-slate-600/20' }
      ];

      const materials = ['Stainless Steel', 'Brass', 'Titanium', 'Copper', 'Aluminum'];
      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
      const features = [
        'Wind-resistant flame', 'Adjustable flame height', 'Butane fuel', 'USB rechargeable',
        'Waterproof casing', 'Safety lock', 'Child safety', 'Lifetime warranty',
        'Fuel gauge', 'Flame visibility', 'Ergonomic design', 'Piezo ignition'
      ];

      const type = productTypes[Math.floor(Math.random() * productTypes.length)];
      const price = Math.floor(Math.random() * 200) + 50;
      const originalPrice = Math.random() > 0.7 ? price + Math.floor(Math.random() * 100) : price;
      
      return {
        id: parseInt(id),
        name: `Premium Lighter ${id}`,
        description: `High-quality ${type.type} lighter with premium finish and excellent performance. Perfect for everyday use and special occasions. This masterpiece combines traditional craftsmanship with modern technology to deliver unparalleled performance.`,
        detailedDescription: `The Premium Lighter ${id} represents the pinnacle of lighter engineering. Crafted with precision and attention to detail, this lighter features advanced ignition technology, ergonomic design for comfortable handling, and a durable construction that ensures longevity. Whether you're lighting candles, cigars, or a campfire, this lighter delivers consistent performance in any condition.`,
        price,
        originalPrice,
        type: type.type,
        badge: type.badge,
        gradient: type.gradient,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 100) + 10,
        stock: Math.floor(Math.random() * 50),
        material: materials[Math.floor(Math.random() * materials.length)],
        colors: colors.slice(0, Math.floor(Math.random() * 3) + 2),
        features: features.slice(0, 6),
        specifications: {
          dimensions: `${(Math.random() * 3 + 8).toFixed(1)} x ${(Math.random() * 2 + 2).toFixed(1)} x ${(Math.random() * 1 + 1).toFixed(1)} cm`,
          weight: `${(Math.random() * 50 + 30).toFixed(0)}g`,
          fuel: 'Butane',
          ignition: 'Piezo Electric',
          flameHeight: 'Adjustable up to 2.5 inches',
          warranty: 'Lifetime',
          origin: 'Switzerland'
        },
        inTheBox: [
          'Premium Lighter',
          'Butane Fuel Canister',
          'User Manual',
          'Warranty Card',
          'Premium Gift Box'
        ]
      };
    };

    const productData = generateProductDetails();
    setProduct(productData);
    setReviews(sampleReviews);
    setLoading(false);
  }, [id]);

  // Navigate back to the exact page we came from
  const handleBackToProducts = () => {
    const fromPage = location.state?.fromPage || 1;
    navigate(`/products?page=${fromPage}`);
    window.scrollTo(0, 0);
  };

  // Navigate to all products (page 1)
  const handleViewAllProducts = () => {
    navigate('/products?page=1');
    window.scrollTo(0, 0);
  };

  // Slideshow navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Review handlers
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      verified: false
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', name: '', email: '' });
  };

  const handleInputChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value
    });
  };

  // Utility functions
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const calculateDiscount = (currentPrice, originalPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-amber-400' : 'text-gray-600'}`}
      >
        ★
      </span>
    ));
  };

  // Dynamic Background Component (same as ProductPage)
  const DynamicBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-600/5 rounded-full blur-2xl animate-orb-pulse"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen relative overflow-hidden">
      <DynamicBackground />

      {/* Navigation Header */}
      <div className="sticky top-0 z-40 bg-gray-800/95 backdrop-blur-xl border-b border-gray-700 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToProducts}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Products
            </button>
            
            <button 
              onClick={handleViewAllProducts}
              className="bg-gradient-to-r from-red-600 to-amber-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              View All Products
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Image Slideshow */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className={`relative rounded-3xl overflow-hidden border border-gray-700 ${product.gradient} h-96`}>
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Product Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                    {product.badge}
                  </span>
                </div>

                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{calculateDiscount(product.price, product.originalPrice)}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      index === currentImageIndex 
                        ? 'border-amber-400 scale-105' 
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {renderStars(parseFloat(product.rating))}
                    <span className="text-amber-400 ml-2 font-semibold">{product.rating}</span>
                    <span className="text-gray-400 ml-1">({product.reviews} reviews)</span>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : product.stock > 0
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Color Options */}
              <div>
                <h3 className="text-white font-semibold mb-3">Color Options</h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded-full border-2 border-gray-600 hover:border-amber-400 transition-all duration-300 cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-white font-semibold">Quantity:</span>
                  <div className="flex items-center border border-gray-600 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-white hover:bg-gray-700 transition-colors cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-white min-w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-white hover:bg-gray-700 transition-colors cursor-pointer"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <button className="px-6 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white rounded-xl font-semibold transition-all duration-300 cursor-pointer">
                    ♡
                  </button>
                </div>
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-700">
                {product.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="mb-16">
            <div className="border-b border-gray-700">
              <div className="flex space-x-8">
                {['description', 'specifications', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 font-semibold text-lg border-b-2 transition-all duration-300 cursor-pointer ${
                      activeTab === tab
                        ? 'border-amber-400 text-amber-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-8">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {product.detailedDescription}
                  </p>
                  
                  <div>
                    <h4 className="text-amber-400 text-xl font-semibold mb-4">What's in the Box</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.inTheBox.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-300">
                          <span className="text-amber-400">•</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  {/* Review Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                      <h4 className="text-amber-400 text-xl font-semibold mb-4">Customer Reviews</h4>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl font-bold text-white">{product.rating}</div>
                        <div>
                          <div className="flex">{renderStars(parseFloat(product.rating))}</div>
                          <div className="text-gray-400">Based on {product.reviews} reviews</div>
                        </div>
                      </div>
                    </div>

                    {/* Add Review Form */}
                    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                      <h4 className="text-amber-400 text-xl font-semibold mb-4">Add Your Review</h4>
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                          <label className="text-gray-300 text-sm mb-2 block">Your Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReview({...newReview, rating: star})}
                                className="text-2xl cursor-pointer"
                              >
                                <span className={star <= newReview.rating ? 'text-amber-400' : 'text-gray-600'}>
                                  ★
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={newReview.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                            required
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={newReview.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                            required
                          />
                        </div>
                        
                        <textarea
                          name="comment"
                          placeholder="Your review..."
                          value={newReview.comment}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 resize-none"
                          required
                        />
                        
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
                        >
                          Submit Review
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    <h4 className="text-amber-400 text-xl font-semibold">Customer Reviews ({reviews.length})</h4>
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-semibold">{review.name}</span>
                              {review.verified && (
                                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Verified Purchase</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <span className="text-gray-400 text-sm">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
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
      `}</style>
    </div>
  );
}

export default ProductDetails;