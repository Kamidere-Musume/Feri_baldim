import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Feri Baldim',
      position: 'Founder & Master Craftsman',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description: 'With over 25 years of experience in precision engineering, Feri brings unparalleled expertise to every lighter we create.',
      specialties: ['Precision Engineering', 'Design Innovation', 'Quality Control']
    },
    {
      id: 2,
      name: 'Sarah Chen',
      position: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      description: 'Sarah combines artistic vision with functional design to create lighters that are both beautiful and practical.',
      specialties: ['Product Design', 'User Experience', 'Material Selection']
    },
    {
      id: 3,
      name: 'Marcus Rodriguez',
      position: 'Production Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      description: 'Marcus ensures every lighter meets our strict quality standards through meticulous production processes.',
      specialties: ['Manufacturing', 'Quality Assurance', 'Supply Chain']
    },
    {
      id: 4,
      name: 'Elena Petrova',
      position: 'Customer Experience Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      description: 'Elena leads our customer service team to ensure every client receives exceptional support and satisfaction.',
      specialties: ['Customer Service', 'Client Relations', 'Brand Experience']
    }
  ];

  // Company milestones
  const milestones = [
    { year: '1998', event: 'Feri Baldim founded the company with a vision for premium lighters' },
    { year: '2005', event: 'Launched first patented electric ignition system' },
    { year: '2012', event: 'Expanded to international markets' },
    { year: '2018', event: 'Opened state-of-the-art manufacturing facility' },
    { year: '2023', event: 'Reached 1 million satisfied customers worldwide' }
  ];

  // Values
  const values = [
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'Constantly pushing boundaries in lighter technology and design'
    },
    {
      icon: '🔧',
      title: 'Craftsmanship',
      description: 'Meticulous attention to detail in every product we create'
    },
    {
      icon: '💎',
      title: 'Quality',
      description: 'Uncompromising standards from material selection to final inspection'
    },
    {
      icon: '🤝',
      title: 'Customer Focus',
      description: 'Building lasting relationships through exceptional service'
    }
  ];

  const DynamicBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-600/5 rounded-full blur-2xl animate-orb-pulse"></div>
    </div>
  );

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
                <span className="relative z-10">SINCE 1998 • PREMIUM CRAFTSMANSHIP</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl font-black tracking-tight">
                  OUR STORY
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
                Crafting exceptional lighters with passion, precision, and unparalleled attention to detail for over two decades.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                The Art of <span className="text-amber-400">Precision Flame</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Founded in 1998 by master craftsman Feri Baldim, our company began with a simple vision: 
                to create the world's finest lighters. What started as a small workshop has grown into 
                an internationally recognized brand, known for innovation, quality, and exceptional design.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Every Feri Baldim lighter is a testament to our commitment to excellence. We combine 
                traditional craftsmanship with cutting-edge technology to produce lighters that are 
                not just tools, but works of art that ignite passion and inspire moments.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">25+</div>
                  <div className="text-gray-400">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">1M+</div>
                  <div className="text-gray-400">Satisfied Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">50+</div>
                  <div className="text-gray-400">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">100+</div>
                  <div className="text-gray-400">Design Awards</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-3xl p-8 border border-amber-400/30 backdrop-blur-lg">
                <div className="aspect-w-16 aspect-h-12 bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700">
                  <div className="w-full h-64 bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">FERI BALDIM WORKSHOP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-amber-400/50 transition-all duration-300 group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Our Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-amber-400/30 h-full"></div>
              
              {/* Milestones */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-amber-400/50 transition-all duration-300">
                        <div className="text-amber-400 font-bold text-lg mb-2">{milestone.year}</div>
                        <p className="text-gray-300">{milestone.event}</p>
                      </div>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full border-4 border-gray-900"></div>
                    
                    {/* Spacer */}
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Meet Our Team</h2>
            <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
              Behind every exceptional lighter is a team of passionate experts dedicated to perfection.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-amber-400/50 transition-all duration-300 group text-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-yellow-300 p-1 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover border-4 border-gray-900"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <div className="text-amber-400 font-semibold mb-3">{member.position}</div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{member.description}</p>
                  
                  <div className="space-y-1">
                    {member.specialties.map((specialty, index) => (
                      <span key={index} className="inline-block bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full text-xs mr-1 mb-1 border border-amber-500/30">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-400/10 rounded-3xl p-12 border border-amber-400/30 backdrop-blur-lg">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Excellence?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have chosen Feri Baldim for their premium lighter needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-orange-600 to-yellow-400 hover:from-orange-700 hover:to-yellow-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg"
                >
                  Explore Our Collection
                </Link>
                <Link
                  to="/contact"
                  className="border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
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
      `}</style>
    </div>
  );
};

export default AboutPage;