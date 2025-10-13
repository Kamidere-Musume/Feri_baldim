import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  // State for lighter categories - will be replaced with API call later
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // Simulate API call - This will be replaced with actual database call
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Static data for categories - This will be replaced with actual API response
        const dummyCategories = [
          {
            id: 1,
            name: "Gas Lighters",
            description: "Classic butane lighters with reliable flame and timeless design. Perfect for everyday use and special occasions.",
            image: "/assets/gas-lighters.jpg",
            count: "25+ Models",
            gradient: "from-blue-500 to-cyan-400",
            icon: "🔥"
          },
          {
            id: 2,
            name: "Electric Lighters",
            description: "Modern plasma arc lighters with rechargeable batteries. Windproof, flameless, and eco-friendly.",
            image: "/assets/electric-lighters.jpg",
            count: "18+ Models",
            gradient: "from-purple-500 to-pink-400",
            icon: "⚡"
          },
          {
            id: 3,
            name: "Vintage Collection",
            description: "Retro and antique-style lighters that combine historical charm with modern functionality.",
            image: "/assets/vintage-lighters.jpg",
            count: "32+ Models",
            gradient: "from-amber-600 to-orange-500",
            icon: "🕰️"
          },
          {
            id: 4,
            name: "Windproof Lighters",
            description: "Rugged lighters built to withstand harsh conditions. Perfect for outdoor adventures.",
            image: "/assets/windproof-lighters.jpg",
            count: "15+ Models",
            count: "15+ Models",
            gradient: "from-green-500 to-emerald-400",
            icon: "💨"
          },
          {
            id: 5,
            name: "Designer Editions",
            description: "Limited edition lighters from renowned designers. Unique artwork and premium materials.",
            image: "/assets/designer-lighters.jpg",
            count: "12+ Models",
            gradient: "from-red-500 to-rose-400",
            icon: "🎨"
          },
          {
            id: 6,
            name: "Luxury Lighters",
            description: "Premium lighters crafted with precious metals and gemstones. The ultimate in luxury.",
            image: "/assets/luxury-lighters.jpg",
            count: "8+ Models",
            gradient: "from-yellow-500 to-amber-400",
            icon: "💎"
          }
        ]
        
        setCategories(dummyCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Function to handle category exploration
  const handleExploreCategory = (categoryId) => {
    // This will navigate to the category page
    console.log('Exploring category:', categoryId)
    // Later: navigate(`/categories/${categoryId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Discovering amazing collections...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="src\assets\homewallpaper.jpg" 
          alt="Home Wallpaper"
          className="w-full h-96 md:h-[500px] lg:h-[600px] object-cover"
        />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl ml-0 md:ml-8 lg:ml-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Ignite Your Style.<br />
                Fuel Your Passion.
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 font-light">
                Style and Spark. Delivered.
              </p>
              
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                Find your spark
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Explore Our Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect lighter for every occasion. From classic designs to modern innovations, 
              find your spark in our carefully curated collections.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-orange-100"
              >
                {/* Category Image/Icon Area */}
                <div className={`h-48 bg-gradient-to-br ${category.gradient} flex items-center justify-center relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Category Icon */}
                  <div className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  
                  {/* Model Count Badge */}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {category.count}
                  </div>
                </div>

                {/* Category Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <button 
                    onClick={() => handleExploreCategory(category.id)}
                    className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer group"
                  >
                    <span className="flex items-center justify-center">
                      Explore Collection
                      <svg 
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-white mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-white text-opacity-90 text-lg mb-6 max-w-2xl mx-auto">
                Our experts can help you find the perfect lighter or create a custom design just for you.
              </p>
              <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                Get Personalized Assistance
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium lighter collections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Every lighter is crafted with precision and built to last</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $50 worldwide</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Exclusive Designs</h3>
              <p className="text-gray-600">Unique collections you won't find anywhere else</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage