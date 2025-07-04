// src/components/Step1Personal.jsx

import React, { useState } from "react";

const Step1Personal = ({ data, setData, onNext }) => {
  const [localData, setLocalData] = useState({
    nombre: data.nombre || "",
    apellido: data.apellido || "",
    email: data.email || data.correo || "",
    telefono: data.telefono || data.numero || "",
  });

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(localData);
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Datos Personales</h2>
        <p className="text-gray-300">Completa tus datos para comenzar el proceso</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Nombre *
            </label>
            <input
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={localData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Apellido *
            </label>
            <input
              name="apellido"
              placeholder="Ingresa tu apellido"
              value={localData.apellido}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Correo Electrónico *
          </label>
          <input
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={localData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Número de Teléfono *
          </label>
          <input
            name="telefono"
            type="tel"
            placeholder="Ej: +34 123 456 789"
            value={localData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>Continuar</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>* Campos obligatorios</p>
        </div>
      </form>
    </div>
  );
};

export default Step1Personal;
