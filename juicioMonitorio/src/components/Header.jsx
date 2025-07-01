import { Link } from 'react-router-dom';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-2xl text-gray-800">F</Link>
          </div>
          <nav className="flex space-x-8">
            <Link to="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Inicio</Link>
            <Link to="/espacios" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Espacios</Link>
            <Link to="/la-marca" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">La Marca</Link>
            <Link to="/noticias" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Noticias</Link>
            <Link to="/contacto" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Contacto</Link>
            <Link to="/formulario" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Formulario</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
