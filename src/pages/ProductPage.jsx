import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'

function ProductPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  
  // Get current page from URL or default to 1
  const urlPage = parseInt(searchParams.get('page')) || 1
  const [currentPage, setCurrentPage] = useState(urlPage)
  
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeFilters, setActiveFilters] = useState(['all'])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [activeTags, setActiveTags] = useState([])
  const [productsPerPage] = useState(12)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [quickPreviewProduct, setQuickPreviewProduct] = useState(null)

  // Scroll to top when page changes (including back/forward navigation)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  // Handle URL filter parameters
  useEffect(() => {
    const urlFilter = searchParams.get('filter');
    if (urlFilter && urlFilter !== 'all') {
      setActiveFilters([urlFilter]);
    }
  }, [searchParams]);

  // Sync URL with current page
  useEffect(() => {
    const params = { page: currentPage.toString() };
    const urlFilter = searchParams.get('filter');
    if (urlFilter) {
      params.filter = urlFilter;
    }
    setSearchParams(params);
  }, [currentPage, setSearchParams]);

  // Handle back/forward navigation
  useEffect(() => {
    setCurrentPage(urlPage)
  }, [urlPage])

  // Enhanced filters with icons
  const filters = [
    { id: 'all', name: 'All Products', icon: '🛍️', count: 0 },
    { id: 'electric', name: 'Electric', icon: '⚡', count: 0 },
    { id: 'fuel', name: 'Fuel', icon: '🔥', count: 0 },
    { id: 'vintage', name: 'Vintage', icon: '🏛️', count: 0 },
    { id: 'standard', name: 'Standard', icon: '⭐', count: 0 }
  ]

  // Available tags for filtering
  const availableTags = [
    { id: 'windproof', name: 'Windproof', icon: '💨', count: 0 },
    { id: 'rechargeable', name: 'Rechargeable', icon: '🔋', count: 0 },
    { id: 'limited', name: 'Limited Edition', icon: '🎯', count: 0 },
    { id: 'premium', name: 'Premium', icon: '💎', count: 0 },
    { id: 'classic', name: 'Classic', icon: '👑', count: 0 },
    { id: 'modern', name: 'Modern', icon: '🚀', count: 0 },
    { id: 'collectible', name: 'Collectible', icon: '🏆', count: 0 },
    { id: 'waterproof', name: 'Water Resistant', icon: '💧', count: 0 }
  ]

  // Add to cart function
  const addToCart = (product) => {
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
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(updatedCart));
    } else {
      // Add new item to cart
      const newItem = {
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString()
      };
      const updatedCart = [...userCart, newItem];
      localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(updatedCart));
    }

    // Show success message
    alert(`${product.name} added to cart!`);
  };

  // Generate sample products
  const generateProducts = () => {
    const productTypes = [
      { type: 'electric', badge: 'Electric', gradient: 'from-blue-500/20 to-purple-600/20' },
      { type: 'fuel', badge: 'Fuel', gradient: 'from-red-500/20 to-orange-600/20' },
      { type: 'vintage', badge: 'Vintage', gradient: 'from-amber-500/20 to-yellow-600/20' },
      { type: 'standard', badge: 'Standard', gradient: 'from-gray-500/20 to-slate-600/20' }
    ]

    const materials = ['Stainless Steel', 'Brass', 'Titanium', 'Copper', 'Aluminum']
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
    const features = [
      'Wind-resistant flame', 'Adjustable flame height', 'Butane fuel', 'USB rechargeable',
      'Waterproof casing', 'Safety lock', 'Child safety', 'Lifetime warranty',
      'Fuel gauge', 'Flame visibility', 'Ergonomic design', 'Piezo ignition'
    ]

    return Array.from({ length: 36 }, (_, i) => {
      const type = productTypes[Math.floor(Math.random() * productTypes.length)]
      const price = Math.floor(Math.random() * 200) + 50
      const originalPrice = Math.random() > 0.7 ? price + Math.floor(Math.random() * 100) : price
      const productFeatures = [...features].sort(() => 0.5 - Math.random()).slice(0, 3)
      
      return {
        id: i + 1,
        name: `Premium Lighter ${i + 1}`,
        description: `High-quality ${type.type} lighter with premium finish and excellent performance. Perfect for everyday use and special occasions.`,
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
        tags: availableTags.slice(0, Math.floor(Math.random() * 4) + 1).map(tag => tag.id),
        features: productFeatures,
        dimensions: `${(Math.random() * 3 + 8).toFixed(1)} x ${(Math.random() * 2 + 2).toFixed(1)} x ${(Math.random() * 1 + 1).toFixed(1)} cm`,
        weight: `${(Math.random() * 50 + 30).toFixed(0)}g`
      }
    })
  }

  // Initialize products
  useEffect(() => {
    const generatedProducts = generateProducts()
    setProducts(generatedProducts)
    setFilteredProducts(generatedProducts)
    setLoading(false)
  }, [])

  // Filter and sort products
  useEffect(() => {
    let result = [...products]

    // Apply category filters
    if (!activeFilters.includes('all')) {
      result = result.filter(product => activeFilters.includes(product.type))
    }

    // Apply tag filters
    if (activeTags.length > 0) {
      result = result.filter(product => 
        activeTags.some(tag => product.tags.includes(tag))
      )
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.material.toLowerCase().includes(term)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => b.id - a.id)
        break
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(result)
    setCurrentPage(1) // Reset to page 1 when filters change
  }, [products, activeFilters, activeTags, searchTerm, sortBy])

  // Update filter counts
  useEffect(() => {
    const updatedFilters = filters.map(filter => ({
      ...filter,
      count: filter.id === 'all' 
        ? products.length 
        : products.filter(p => p.type === filter.id).length
    }))
    
    const updatedTags = availableTags.map(tag => ({
      ...tag,
      count: products.filter(p => p.tags.includes(tag.id)).length
    }))
  }, [products])

  // Handler functions
  const handleFilterToggle = (filterId) => {
    setActiveFilters(prev => {
      if (filterId === 'all') {
        return ['all']
      }
      const newFilters = prev.filter(f => f !== 'all')
      if (newFilters.includes(filterId)) {
        return newFilters.length === 1 ? ['all'] : newFilters.filter(f => f !== filterId)
      } else {
        return [...newFilters, filterId]
      }
    })
  }

  const handleTagToggle = (tagId) => {
    setActiveTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    )
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleSort = (sortType) => {
    setSortBy(sortType)
  }

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`, { 
      state: { fromPage: currentPage } 
    })
  }

  const handleQuickPreview = (product) => {
    setQuickPreviewProduct(product)
  }

  const closeQuickPreview = () => {
    setQuickPreviewProduct(null)
  }

  const clearAllFilters = () => {
    setActiveFilters(['all'])
    setActiveTags([])
    setSearchTerm('')
    setSearchParams({ page: '1' })
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Updated pagination functions with scroll to products grid
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    const productsGrid = document.getElementById('products-grid')
    if (productsGrid) {
      productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const nextPage = () => {
    const next = Math.min(currentPage + 1, totalPages)
    setCurrentPage(next)
    const productsGrid = document.getElementById('products-grid')
    if (productsGrid) {
      productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const prevPage = () => {
    const prev = Math.max(currentPage - 1, 1)
    setCurrentPage(prev)
    const productsGrid = document.getElementById('products-grid')
    if (productsGrid) {
      productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Utility functions
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const calculateDiscount = (currentPrice, originalPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  // Dynamic Background Component
  const DynamicBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-600/5 rounded-full blur-2xl animate-orb-pulse"></div>
    </div>
  )

  // Quick Preview Component
  const QuickPreview = ({ product, onClose }) => {
    if (!product) return null

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <div 
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-amber-500/30 shadow-2xl max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{product.name}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Product Image */}
            <div className={`h-48 rounded-2xl mb-4 ${product.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-semibold bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                  {product.badge} Lighter
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Quick Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-700/50 rounded-xl p-3">
                <div className="text-amber-400 text-sm font-semibold">Price</div>
                <div className="text-white font-bold text-lg">{formatPrice(product.price)}</div>
                {product.originalPrice > product.price && (
                  <div className="text-gray-400 text-sm line-through">{formatPrice(product.originalPrice)}</div>
                )}
              </div>
              
              <div className="bg-gray-700/50 rounded-xl p-3">
                <div className="text-amber-400 text-sm font-semibold">Rating</div>
                <div className="text-white font-bold text-lg flex items-center">
                  <span className="text-amber-400 mr-1">★</span>
                  {product.rating} ({product.reviews} reviews)
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="text-amber-400 font-semibold mb-2">Key Features</h4>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-400">Material:</span>
                <span className="text-white ml-2">{product.material}</span>
              </div>
              <div>
                <span className="text-gray-400">Dimensions:</span>
                <span className="text-white ml-2">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-gray-400">Weight:</span>
                <span className="text-white ml-2">{product.weight}</span>
              </div>
              <div>
                <span className="text-gray-400">Stock:</span>
                <span className={`ml-2 ${
                  product.stock > 10 ? 'text-green-400' : 
                  product.stock > 0 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {product.stock} units
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  addToCart(product)
                  onClose()
                }}
                disabled={product.stock === 0}
                className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button 
                onClick={() => {
                  handleViewProduct(product)
                  onClose()
                }}
                className="flex-1 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen relative overflow-hidden">
      <DynamicBackground />
      
      {/* Quick Preview Modal */}
      <QuickPreview 
        product={quickPreviewProduct} 
        onClose={closeQuickPreview} 
      />

      {/* Premium Hero Section */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-gray-900/80 to-amber-900/40"></div>
        </div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-amber-600 text-white px-8 py-4 rounded-full text-sm font-bold mb-8 shadow-2xl backdrop-blur-sm border border-amber-400/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:20px_20px]"></div>
                <span className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse relative z-10"></span>
                <span className="relative z-10">PREMIUM COLLECTION • {products.length} EXQUISITE PIECES</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-red-500 via-amber-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl font-black tracking-tight">
                  FERI BALDIM
                </span>
                <br />
                <span className="text-white drop-shadow-2xl font-light tracking-wider text-4xl md:text-6xl lg:text-7xl">
                  Master Collection
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
                Discover our complete range of premium lighters. From cutting-edge electric models to timeless vintage pieces, find your perfect flame.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Control Bar */}
      <div className="sticky top-0 z-40 bg-gray-800/95 backdrop-blur-xl border-b border-gray-700 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Left Section: Filter Toggle & Search */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-amber-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-red-500/25 min-w-[140px] justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filters
                {(activeFilters.filter(f => f !== 'all').length > 0 || activeTags.length > 0) && (
                  <span className="bg-white text-amber-600 px-2 py-1 rounded-full text-xs font-bold min-w-[20px]">
                    {activeFilters.filter(f => f !== 'all').length + activeTags.length}
                  </span>
                )}
              </button>

              {/* Search Bar */}
              <div className="relative flex-1 lg:flex-none lg:w-96">
                <input
                  type="text"
                  placeholder="Search products by name, features, material..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-6 py-3 pl-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300 cursor-text"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Right Section: Sort & Results Info */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
              {/* Results Count */}
              <div className="text-sm text-gray-300 hidden sm:block">
                <span className="font-semibold text-amber-400">{filteredProducts.length}</span> products found
              </div>

              {/* Enhanced Sort Dropdown */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-md rounded-xl px-3 py-2 border border-amber-400/30 shadow-lg hover:border-amber-300 transition-all duration-300 cursor-pointer group">
                <svg className="w-4 h-4 text-amber-300 group-hover:text-amber-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                <span className="text-amber-200 text-sm font-medium group-hover:text-amber-100 transition-colors">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="bg-transparent border-none text-amber-100 focus:outline-none focus:ring-0 text-sm font-medium cursor-pointer group-hover:text-white transition-colors"
                >
                  <option value="name" className="bg-gray-800 text-white cursor-pointer">Name A-Z</option>
                  <option value="price-low" className="bg-gray-800 text-white cursor-pointer">Price: Low to High</option>
                  <option value="price-high" className="bg-gray-800 text-white cursor-pointer">Price: High to Low</option>
                  <option value="rating" className="bg-gray-800 text-white cursor-pointer">Highest Rated</option>
                  <option value="newest" className="bg-gray-800 text-white cursor-pointer">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(activeFilters.filter(f => f !== 'all').length > 0 || activeTags.length > 0) && (
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <span className="text-sm text-gray-400 font-medium">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {activeFilters.filter(f => f !== 'all').map(filterId => {
                  const filter = filters.find(f => f.id === filterId)
                  return filter ? (
                    <span key={filterId} className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 cursor-default">
                      {filter.icon} {filter.name}
                      <button 
                        onClick={() => handleFilterToggle(filterId)}
                        className="hover:text-amber-200 text-xs transition-colors cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ) : null
                })}
                {activeTags.map(tagId => {
                  const tag = availableTags.find(t => t.id === tagId)
                  return tag ? (
                    <span key={tagId} className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 cursor-default">
                      {tag.icon} {tag.name}
                      <button 
                        onClick={() => handleTagToggle(tagId)}
                        className="hover:text-red-200 text-xs transition-colors cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ) : null
                })}
                <button 
                  onClick={clearAllFilters}
                  className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Classic Filter Panel */}
      {showFilterPanel && (
        <div className="bg-gray-800/95 backdrop-blur-lg border-b border-gray-700 py-6 shadow-xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Panel Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-amber-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                </div>
                Filter Products
              </h3>
              <button
                onClick={() => setShowFilterPanel(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Compact Category Filters */}
              <div className="bg-gray-700/40 rounded-xl p-4 backdrop-blur-md border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-amber-400">📦</span>
                  Categories
                </h4>
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => handleFilterToggle(filter.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 border cursor-pointer ${
                        activeFilters.includes(filter.id)
                          ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white border-amber-400 shadow-lg'
                          : 'bg-gray-600/30 text-gray-300 border-gray-500 hover:border-amber-400 hover:bg-gray-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{filter.icon}</span>
                        <span className="font-medium text-sm">{filter.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeFilters.includes(filter.id) ? 'bg-white/20' : 'bg-black/30 text-gray-400'
                      }`}>
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Feature Tags */}
              <div className="bg-gray-700/40 rounded-xl p-4 backdrop-blur-md border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-amber-400">🏷️</span>
                  Features
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => handleTagToggle(tag.id)}
                      className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 border text-sm cursor-pointer ${
                        activeTags.includes(tag.id)
                          ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white border-amber-400 shadow-lg'
                          : 'bg-gray-600/30 text-gray-300 border-gray-500 hover:border-amber-400 hover:bg-gray-500/40'
                      } ${tag.count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={tag.count === 0}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{tag.icon}</span>
                        <span className="font-medium">{tag.name}</span>
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeTags.includes(tag.id) ? 'bg-white/20' : 'bg-black/30 text-gray-400'
                      }`}>
                        {tag.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Action Buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowFilterPanel(false)}
                className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Apply Filters
              </button>
              <button
                onClick={clearAllFilters}
                className="border border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400 px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid Section */}
      <div id="products-grid" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-amber-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-4 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:15px_15px]"></div>
              <span className="relative">
                {activeFilters.includes('all') && activeTags.length === 0 && !searchTerm ? 'All Products' : 'Search Results'} • {filteredProducts.length} Items
              </span>
            </div>
            {searchTerm && (
              <p className="text-gray-400 text-lg">
                Search results for: "<span className="text-amber-400 font-semibold">{searchTerm}</span>"
              </p>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {currentProducts.map((product) => (
              <div 
                key={product.id}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-700 flex flex-col h-full min-h-[480px]"
              >
                {/* Product Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    {product.badge}
                  </span>
                </div>

                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                  <div className="absolute top-3 right-3 z-20 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{calculateDiscount(product.price, product.originalPrice)}%
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-12 left-3 z-20 bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs font-semibold border border-white/20">
                  <div className="flex items-center">
                    <span className="text-amber-400 mr-1">★</span>
                    {product.rating} ({product.reviews})
                  </div>
                </div>
                
                {/* Product Image Area */}
                <div className={`h-48 bg-gradient-to-br ${product.gradient} relative overflow-hidden group cursor-pointer`}
                     onClick={() => handleViewProduct(product)}>
                  <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[size:20px_20px]"></div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  {/* Stock Status */}
                  <div className="absolute bottom-2 left-2 z-20">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 10 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : product.stock > 0
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  {/* Quick Preview Button */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuickPreview(product)
                        }}
                        className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-semibold text-sm border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer"
                      >
                        Quick Preview
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Content */}
                <div className="flex-1 flex flex-col p-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 cursor-pointer"
                      onClick={() => handleViewProduct(product)}>
                    {product.name}
                  </h3>
                  
                  <div className="flex-1 mb-3">
                    <p className="text-gray-400 leading-relaxed text-xs mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Color Options */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500">Colors:</span>
                      <div className="flex gap-1">
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full border border-gray-600"
                            style={{ backgroundColor: color }}
                            title={`Color option ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Product Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.slice(0, 2).map((tagId, index) => {
                        const tag = availableTags.find(t => t.id === tagId)
                        return tag ? (
                          <span 
                            key={index}
                            className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full text-xs border border-amber-500/30"
                          >
                            {tag.icon} {tag.name}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                  
                  {/* Price and Action */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700/50">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold text-white">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{product.material}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white px-3 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl group relative overflow-hidden text-xs"
                      disabled={product.stock === 0}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:15px_15px] transition-opacity duration-300"></div>
                      <span className="flex items-center justify-center relative">
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </span>
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProduct(product);
                      }}
                      className="px-4 py-2 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white rounded-lg font-semibold transition-all duration-300 cursor-pointer text-xs"
                    >
                      Details
                    </button>
                  </div>
                </div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Products Found</h3>
              <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? `We couldn't find any products matching "${searchTerm}". Try adjusting your search terms.`
                  : `No products found with the selected filters.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  currentPage === 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:from-red-700 hover:to-amber-700'
                }`}
              >
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  currentPage === totalPages
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:from-red-700 hover:to-amber-700'
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Results Info */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-6 text-gray-400 text-sm">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </div>
          )}
        </div>
      </div>

      {/* Add CSS animations */}
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
  )
}

export default ProductPage