import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  const [categories, setCategories] = useState([])
  const [newDrops, setNewDrops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const dummyCategories = [
          {
            id: 1,
            name: "Fuel Lighters",
            description: "Traditional fuel lighters with classic windproof design. Perfect for everyday use and reliable performance.",
            image: "/assets/zippo-fuel.jpg",
            count: "45+ Models",
            gradient: "from-red-600 to-amber-600",
            icon: "🔥",
            badge: "Classic"
          },
          {
            id: 2,
            name: "Electric Lighters",
            description: "Modern electric lighters with rechargeable technology. Flameless operation with the same reliability.",
            image: "/assets/zippo-electric.jpg",
            count: "20+ Models",
            gradient: "from-blue-600 to-cyan-500",
            icon: "⚡",
            badge: "Modern"
          },
          {
            id: 3,
            name: "Vintage Collection",
            description: "Authentic vintage lighters from various eras. Each piece carries historical significance and unique character.",
            image: "/assets/zippo-vintage.jpg",
            count: "35+ Models",
            gradient: "from-amber-700 to-orange-600",
            icon: "🕰️",
            badge: "Vintage"
          },
          {
            id: 4,
            name: "Standard Series",
            description: "Essential lighters with timeless designs. Durable, reliable, and perfect for daily carry.",
            image: "/assets/zippo-standard.jpg",
            count: "60+ Models",
            gradient: "from-green-600 to-emerald-500",
            icon: "⭐",
            badge: "Essential"
          }
        ]

        const dummyNewDrops = [
          {
            id: 1,
            name: "Neon Glow Series",
            description: "Limited edition lighters with vibrant neon accents and glow-in-the-dark elements. Stand out in the dark.",
            image: "/assets/neon-glow.jpg",
            count: "Limited Edition",
            gradient: "from-purple-600 to-pink-500",
            icon: "💫",
            badge: "New Drop",
            status: "Just Launched"
          },
          {
            id: 2,
            name: "Carbon Fiber Elite",
            description: "Ultra-light carbon fiber construction with precision engineering. Perfect blend of strength and style.",
            image: "/assets/carbon-fiber.jpg",
            count: "Premium Series",
            gradient: "from-gray-700 to-gray-900",
            icon: "⚙️",
            badge: "Just Added",
            status: "Limited Stock"
          },
          {
            id: 3,
            name: "Artisan Wood Collection",
            description: "Handcrafted lighters featuring exotic wood inlays and natural finishes. Each piece is unique.",
            image: "/assets/artisan-wood.jpg",
            count: "Handmade",
            gradient: "from-amber-800 to-yellow-600",
            icon: "🌳",
            badge: "New Release",
            status: "Exclusive"
          },
          {
            id: 4,
            name: "Titanium Pro",
            description: "Aerospace-grade titanium lighters with advanced ignition systems. Built to withstand extreme conditions.",
            image: "/assets/titanium-pro.jpg",
            count: "Pro Series",
            gradient: "from-slate-600 to-blue-400",
            icon: "🚀",
            badge: "Hot Drop",
            status: "Bestseller"
          }
        ]
        
        setCategories(dummyCategories)
        setNewDrops(dummyNewDrops)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleExploreCategory = (categoryId) => {
    console.log('Exploring category:', categoryId)
  }

  const handleViewNewDrop = (dropId) => {
    console.log('Viewing new drop:', dropId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        {/* Loading Animation */}
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-600 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-amber-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-300 text-lg font-semibold">Loading Feri Baldim Collections...</p>
        </div>
      </div>
    )
  }

  // Enhanced Background Component
  const FireBackground = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* Main Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,_#333_1px,_transparent_1px),_linear-gradient(180deg,_#333_1px,_transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Diagonal Lines */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,_transparent_48%,_#d97706_50%,_transparent_52%)] bg-[size:100px_100px]"></div>
      
      {/* Circle Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_#dc2626_1px,_transparent_1px)] bg-[size:80px_80px]"></div>
      
      {/* Animated Fire Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-red-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-1500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl animate-pulse delay-750"></div>
      
      {/* Flame-like shapes */}
      <div className="absolute top-10 left-10 w-24 h-32 bg-gradient-to-b from-red-500/20 to-transparent opacity-30 blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-20 h-28 bg-gradient-to-b from-amber-500/20 to-transparent opacity-30 blur-xl animate-pulse delay-500"></div>
    </div>
  )

  // Reusable Card Component for both Collections and New Drops - WIDER
  const ProductCard = ({ item, onAction, isNewDrop = false }) => (
    <div 
      className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl hover:shadow-red-500/20 transition-all duration-700 transform hover:-translate-y-2 overflow-hidden border border-gray-700 flex flex-col h-full min-h-[550px]"
    >
      {/* Collection Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          {item.badge}
        </span>
      </div>

      {/* Status Badge for New Drops */}
      {isNewDrop && (
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            {item.status}
          </span>
        </div>
      )}
      
      {/* Category Header - WIDER with Image Area */}
      <div className={`h-80 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden group`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
        </div>
        
        {/* Collection Icon Container */}
        <div className="relative z-10">
          <div className="text-7xl filter drop-shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            {item.icon}
          </div>
        </div>
        
        {/* Model Count */}
        <div className={`absolute ${isNewDrop ? 'bottom-4 right-4' : 'top-4 right-4'} bg-black/40 backdrop-blur-md text-white px-3 py-2 rounded-xl text-sm font-semibold border border-white/20`}>
          {item.count}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500"></div>
      </div>

      {/* Category Content - WIDER */}
      <div className="flex-1 flex flex-col p-8">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
          {item.name}
        </h3>
        
        <div className="flex-1 mb-6">
          <p className="text-gray-400 leading-relaxed text-lg">
            {item.description}
          </p>
        </div>
        
        {/* Fixed Height Button Container */}
        <div className="h-16 mt-auto">
          <button 
            onClick={() => onAction(item.id)}
            className="w-full h-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer group relative overflow-hidden text-lg"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:20px_20px] transition-opacity duration-300"></div>
            <span className="flex items-center justify-center text-lg relative">
              {isNewDrop ? 'Shop Now' : 'View Collection'}
              <svg 
                className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" 
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
      
      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )

  return (
    <div className="bg-gray-900">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden min-h-screen">
        <FireBackground />

        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="src/assets/homewallpaper.jpg" 
            alt="Lighters Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-gray-900/70 to-amber-900/30"></div>
        </div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              {/* Feri Baldim Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-amber-600 text-white px-8 py-4 rounded-full text-sm font-bold mb-8 shadow-2xl backdrop-blur-sm border border-amber-400/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:20px_20px]"></div>
                <span className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse relative z-10"></span>
                <span className="relative z-10">PREMIUM LIGHTERS • QUALITY GUARANTEED</span>
              </div>
              
              {/* Feri Baldim Logo Style Text */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-red-500 via-amber-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl font-black tracking-tight">
                  FERI BALDIM
                </span>
                <br />
                <span className="text-white drop-shadow-2xl font-light tracking-wider text-4xl md:text-6xl lg:text-7xl">
                  Premium Lighters
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
                Discover our exclusive collection of premium lighters. Quality craftsmanship meets innovative design for the perfect flame.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25 cursor-pointer border-2 border-amber-400 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:30px_30px] transition-opacity duration-300"></div>
                  <span className="relative">Explore Collections</span>
                </button>
                <button className="border-2 border-white/50 text-white hover:border-amber-400 hover:bg-amber-400/10 px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer backdrop-blur-sm">
                  Find Retailer
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center backdrop-blur-sm bg-red-900/20">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-800 border-y border-gray-700 py-12 relative overflow-hidden">
        <FireBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Lighters Sold" },
              { number: "4", label: "Collections" },
              { number: "Premium", label: "Quality" },
              { number: "100%", label: "Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent mb-2 relative">
                  {stat.number}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-amber-400 transition-all duration-300"></div>
                </div>
                <div className="text-gray-400 font-medium group-hover:text-amber-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collections Section */}
      <div className="py-24 relative overflow-hidden bg-gray-900">
        <FireBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-amber-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:15px_15px]"></div>
              <span className="relative">Feri Baldim Collections</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Collections</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore our carefully curated collections of premium lighters. From classic fuel lighters to modern electric designs, 
              find the perfect lighter for every occasion.
            </p>
          </div>

          {/* Enhanced Categories Grid with WIDER Cards - 2 columns on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {categories.map((category, index) => (
              <ProductCard 
                key={category.id}
                item={category}
                onAction={handleExploreCategory}
                isNewDrop={false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* New Drops Section */}
      <div className="py-24 relative overflow-hidden bg-gray-800 border-t border-gray-700">
        <FireBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:15px_15px]"></div>
              <span className="relative">Latest Releases</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              New <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">Drops</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover our latest releases and limited edition drops. Fresh designs, innovative features, and exclusive collections that redefine premium lighters.
            </p>
          </div>

          {/* New Drops Grid with WIDER Cards - 2 columns on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {newDrops.map((drop, index) => (
              <ProductCard 
                key={drop.id}
                item={drop}
                onAction={handleViewNewDrop}
                isNewDrop={true}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 cursor-pointer border-2 border-pink-400 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:30px_30px] transition-opacity duration-300"></div>
              <span className="relative">View All New Drops</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-800 border-t border-gray-700 relative overflow-hidden">
        <FireBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Feri Baldim</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Premium quality, innovative designs, and exceptional customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Quality Guarantee",
                description: "Every Feri Baldim lighter is crafted with premium materials and undergoes rigorous quality testing",
                features: ["Premium Materials", "Quality Testing", "Reliable Performance"]
              },
              {
                icon: "🎯",
                title: "Perfect Design",
                description: "Ergonomic designs that combine style with functionality for the perfect user experience",
                features: ["Ergonomic", "Stylish", "Functional"]
              },
              {
                icon: "⚡",
                title: "Innovation",
                description: "Blending traditional craftsmanship with modern technology for superior lighter performance",
                features: ["Modern Tech", "Traditional Craft", "Superior Performance"]
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden"
              >
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[size:30px_30px]"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                    <span className="text-3xl text-white">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-400 mb-6 text-center text-lg leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-gray-900 border-t border-gray-700 relative overflow-hidden">
        <FireBackground />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-amber-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:15px_15px]"></div>
            <span className="relative">Feri Baldim Updates</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Feri Baldim Community
          </h3>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Be the first to know about new collections, exclusive offers, and special promotions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-lg backdrop-blur-sm"
            />
            <button className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg border border-amber-400 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[linear-gradient(45deg,_transparent_48%,_#fff_50%,_transparent_52%)] bg-[size:20px_20px] transition-opacity duration-300"></div>
              <span className="relative">Subscribe</span>
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Stay updated with Feri Baldim news. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage