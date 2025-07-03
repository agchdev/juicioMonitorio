// src/components/Step3Facturas.jsx

import React from "react";

const Step3Facturas = ({ files, setFiles, onBack, onSubmit }) => {
  const handleFileChange = (e, idx) => {
    const newFiles = [...files];
    newFiles[idx] = e.target.files[0];
    setFiles(newFiles);
  };

  const addFile = () => {
    if (files.length < 10) setFiles([...files, null]);
  };

  const removeFile = (idx) => {
    const newFiles = files.filter((_, i) => i !== idx);
    setFiles(newFiles);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Documentos de Soporte</h2>
        <p className="text-gray-300">Sube las facturas y documentos relacionados</p>
      </div>

      <form onSubmit={e => { e.preventDefault(); onSubmit && onSubmit(); }} className="space-y-6">
        {/* Add File Button */}
        <div className="text-center">
          <button 
            type="button" 
            onClick={addFile} 
            disabled={files.length >= 10}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              files.length >= 10 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-green-700 hover:bg-green-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Añadir Documento</span>
            <span className="text-sm opacity-75">({files.length}/10)</span>
          </button>
        </div>

        {/* File List */}
        <div className="space-y-4">
          {files.length === 0 ? (
            <div className="text-center py-12 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600">
              <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-400 text-lg mb-2">No hay documentos añadidos</p>
              <p className="text-gray-500 text-sm">Haz clic en "Añadir Documento" para subir tus archivos</p>
            </div>
          ) : (
            files.map((file, idx) => (
              <div key={idx} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Documento {idx + 1}</h4>
                      {file && <p className="text-green-400 text-sm">{file.name}</p>}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeFile(idx)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded-lg transition-all duration-200"
                    title="Eliminar documento"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Seleccionar archivo *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={e => handleFileChange(e, idx)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-900 file:cursor-pointer cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500">
                    Formatos permitidos: PDF, DOC, DOCX, JPG, PNG (máx. 10MB)
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Section */}
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-blue-300 font-medium mb-1">Documentos recomendados</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Facturas originales</li>
                <li>• Contratos o acuerdos</li>
                <li>• Correspondencia con el deudor</li>
                <li>• Comprobantes de entrega</li>
              </ul>
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
            className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Finalizar y Generar PDF</span>
          </button>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>Los documentos son opcionales pero recomendados para fortalecer tu caso</p>
        </div>
      </form>
    </div>
  );
};

export default Step3Facturas;
