const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-400 to-yellow-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main content layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Left side - Logo, Title and description */}
          <div className="mb-8 lg:mb-0 lg:w-2/5">
            {/* Your Logo */}
            <div className="mb-4">
              <img 
                src="src/assets/logo.png" 
                alt="logo"
                className="h-25 w-auto" // Adjust height as needed
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
            <p className="text-white text-opacity-90 mb-2 leading-relaxed">
              Descriptive line about what your company does.
            </p>
            <p className="text-white text-opacity-90">
              Best practices
            </p>
          </div>

          {/* Right side - Three columns table-like layout */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Lighters Column */}
              <div>
                <h3 className="font-semibold text-white text-lg mb-4">Lighters</h3>
                <div className="space-y-2">
                  <p className="text-white text-opacity-90 hover:text-white transition-colors cursor-pointer">
                    Quality
                  </p>
                </div>
              </div>

              {/* Blog Column */}
              <div>
                <h3 className="font-semibold text-white text-lg mb-4">Blog</h3>
                <div className="space-y-2">
                  <p className="text-white text-opacity-90 hover:text-white transition-colors cursor-pointer">
                    Case studies
                  </p>
                  <p className="text-white text-opacity-90 hover:text-white transition-colors cursor-pointer">
                    Customer stories
                  </p>
                </div>
              </div>

              {/* Contact Column */}
              <div>
                <h3 className="font-semibold text-white text-lg mb-4">Contact</h3>
                <div className="space-y-2">
                  <p className="text-white text-opacity-90 hover:text-white transition-colors cursor-pointer">
                    Support
                  </p>
                  <p className="text-white text-opacity-90 hover:text-white transition-colors cursor-pointer">
                    Legal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-orange-300 border-opacity-30 pt-8 mt-8">
          <p className="text-white text-opacity-80 text-sm text-center">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;