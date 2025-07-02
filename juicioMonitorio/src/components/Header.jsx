import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-3xl text-blue-900">JM</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            <Link to="/" className="text-gray-600 hover:text-blue-900 hover:bg-blue-50 px-4 py-2 text-sm font-medium transition-all duration-200">
              Inicio
            </Link>
            <Link to="/espacios" className="text-gray-600 hover:text-blue-900 hover:bg-blue-50 px-4 py-2 text-sm font-medium transition-all duration-200">
              Servicios
            </Link>
            <Link to="/la-marca" className="text-gray-600 hover:text-blue-900 hover:bg-blue-50 px-4 py-2 text-sm font-medium transition-all duration-200">
              Nosotros
            </Link>
            <Link to="/noticias" className="text-gray-600 hover:text-blue-900 hover:bg-blue-50 px-4 py-2 text-sm font-medium transition-all duration-200">
              Blog
            </Link>
            <Link to="/contacto" className="text-gray-600 hover:text-blue-900 hover:bg-blue-50 px-4 py-2 text-sm font-medium transition-all duration-200">
              Contacto
            </Link>
          </nav>

          {/* CTA Button & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/formulario" 
              className="sm:inline-flex bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-6 text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Consulta gratuita
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-900 hover:bg-blue-50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-800 hover:text-blue-900 hover:bg-blue-50 px-4 py-3 text-sm font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/espacios" 
                className="text-gray-800 hover:text-blue-900 hover:bg-blue-50 px-4 py-3 text-sm font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                to="/la-marca" 
                className="text-gray-800 hover:text-blue-900 hover:bg-blue-50 px-4 py-3 text-sm font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link 
                to="/noticias" 
                className="text-gray-800 hover:text-blue-900 hover:bg-blue-50 px-4 py-3 text-sm font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contacto" 
                className="text-gray-800 hover:text-blue-900 hover:bg-blue-50 px-4 py-3 text-sm font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link 
                to="/formulario" 
                className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-4 text-sm transition-all duration-300 text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Consulta gratuita
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
