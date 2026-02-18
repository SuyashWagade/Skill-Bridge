import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Briefcase } from 'lucide-react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check authentication
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg backdrop-blur-lg bg-opacity-95' 
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            SkillBridge
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Browse Services
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard/post-job"
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  <Briefcase size={18} />
                  <span>Post Job</span>
                </Link>
                <Link 
                  to="/dashboard/profile"
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <User size={24} />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut size={24} />
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-red-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fadeIn">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-red-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="block text-gray-700 hover:text-red-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Services
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block text-gray-700 hover:text-red-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/dashboard/post-job" 
                  className="block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Post Job
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block text-gray-700 hover:text-red-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;