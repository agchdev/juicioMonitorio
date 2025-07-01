import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Acerca de</h3>
            <p className="text-gray-600">Un espacio dedicado a compartir información y recursos.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-gray-900">Inicio</Link></li>
              <li><Link to="/espacios" className="text-gray-600 hover:text-gray-900">Espacios</Link></li>
              <li><Link to="/la-marca" className="text-gray-600 hover:text-gray-900">La Marca</Link></li>
              <li><Link to="/noticias" className="text-gray-600 hover:text-gray-900">Noticias</Link></li>
              <li><Link to="/contacto" className="text-gray-600 hover:text-gray-900">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <p className="text-gray-600">Email: info@example.com</p>
            <p className="text-gray-600">Teléfono: +34 123 456 789</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
