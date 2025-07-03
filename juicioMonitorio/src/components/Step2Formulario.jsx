// src/components/Step2Formulario.jsx

import React, { useState } from "react";

const Step2Formulario = ({ data, setData, onNext, onBack }) => {
  const [localData, setLocalData] = useState({
    tipoReclamacion: data.tipoReclamacion || "deuda",
    fechaFactura: data.fechaFactura || "",
    importeTotal: data.importeTotal || "",
    descripcionDeuda: data.descripcionDeuda || "",
    datosDeudor: {
      nombre: data.datosDeudor?.nombre || "",
      apellidos: data.datosDeudor?.apellidos || "",
      direccion: data.datosDeudor?.direccion || "",
      ciudad: data.datosDeudor?.ciudad || "",
      codigoPostal: data.datosDeudor?.codigoPostal || "",
      provincia: data.datosDeudor?.provincia || ""
    }
  });

  // Manejo de cambios para campos anidados
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("datosDeudor.")) {
      const key = name.replace("datosDeudor.", "");
      setLocalData({
        ...localData,
        datosDeudor: {
          ...localData.datosDeudor,
          [key]: value,
        },
      });
    } else {
      setLocalData({ ...localData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(localData);
    onNext();
    // Aquí después podrás hacer la llamada real al backend o generar el PDF
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z" clipRule="evenodd" />
            <path d="M6 8h8v2H6V8z" />
            <path d="M6 10h8v2H6v-2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Datos de la Reclamación</h2>
        <p className="text-gray-300">Proporciona los detalles de tu caso</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Reclamación */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Tipo de Reclamación *
          </label>
          <select
            name="tipoReclamacion"
            value={localData.tipoReclamacion}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="deuda">Reclamación de Deuda</option>
            <option value="factura">Factura Impagada</option>
            <option value="contrato">Incumplimiento de Contrato</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* Fecha y Importe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Fecha de Factura/Documento *
            </label>
            <input
              type="date"
              name="fechaFactura"
              value={localData.fechaFactura}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Importe Total (€) *
            </label>
            <input
              type="number"
              step="0.01"
              name="importeTotal"
              placeholder="0.00"
              value={localData.importeTotal}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Descripción de la Deuda *
          </label>
          <textarea
            name="descripcionDeuda"
            value={localData.descripcionDeuda}
            onChange={handleChange}
            rows={4}
            placeholder="Describe detalladamente la naturaleza de la deuda, servicios prestados, productos vendidos, etc."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            required
          />
        </div>

        {/* Datos del Deudor */}
        <div className="bg-gray-700 rounded-lg p-6 space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-800 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Datos del Deudor</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Nombre *
              </label>
              <input
                name="datosDeudor.nombre"
                placeholder="Nombre del deudor"
                value={localData.datosDeudor.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Apellidos *
              </label>
              <input
                name="datosDeudor.apellidos"
                placeholder="Apellidos del deudor"
                value={localData.datosDeudor.apellidos}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Dirección *
            </label>
            <input
              name="datosDeudor.direccion"
              placeholder="Dirección completa"
              value={localData.datosDeudor.direccion}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Ciudad *
              </label>
              <input
                name="datosDeudor.ciudad"
                placeholder="Ciudad"
                value={localData.datosDeudor.ciudad}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Código Postal *
              </label>
              <input
                name="datosDeudor.codigoPostal"
                placeholder="CP"
                value={localData.datosDeudor.codigoPostal}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Provincia *
              </label>
              <input
                name="datosDeudor.provincia"
                placeholder="Provincia"
                value={localData.datosDeudor.provincia}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <span>Atrás</span>
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
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

export default Step2Formulario;
