import React, { useState, useEffect } from 'react';

export default function UploadForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    facturas: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [facturaErrors, setFacturaErrors] = useState([]);
  
  // Añadir una factura vacía al iniciar el componente
  useEffect(() => {
    if (formData.facturas.length === 0) {
      addFactura();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar el error si el campo se está editando
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e, index) => {
    const { files } = e.target;
    const newFacturas = [...formData.facturas];
    
    // Actualizar la factura en el índice especificado
    newFacturas[index] = files[0];
    
    setFormData({
      ...formData,
      facturas: newFacturas
    });
    
    // Limpiar el error si el archivo se está cargando
    const newFacturaErrors = [...facturaErrors];
    newFacturaErrors[index] = '';
    setFacturaErrors(newFacturaErrors);
  };
  
  const addFactura = () => {
    if (formData.facturas.length < 10) {
      setFormData({
        ...formData,
        facturas: [...formData.facturas, null]
      });
      setFacturaErrors([...facturaErrors, '']);
    }
  };
  
  const removeFactura = (index) => {
    const newFacturas = [...formData.facturas];
    newFacturas.splice(index, 1);
    
    const newFacturaErrors = [...facturaErrors];
    newFacturaErrors.splice(index, 1);
    
    setFormData({
      ...formData,
      facturas: newFacturas
    });
    
    setFacturaErrors(newFacturaErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    const newFacturaErrors = Array(formData.facturas.length).fill('');
    let hasFacturaErrors = false;
    
    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    }
    
    // Validar teléfono (formato español)
    const phoneRegex = /^(?:\+34|0034|34)?[6789]\d{8}$/;
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!phoneRegex.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Introduce un número de teléfono válido';
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Introduce un email válido';
    }
    
    // Validar al menos una factura
    if (formData.facturas.length === 0) {
      newErrors.facturas = 'Debes adjuntar al menos una factura';
    } else {
      // Validar cada factura
      formData.facturas.forEach((factura, index) => {
        if (!factura) {
          newFacturaErrors[index] = 'Debes adjuntar la factura';
          hasFacturaErrors = true;
        }
      });
    }
    
    // Actualizar errores de facturas
    setFacturaErrors(newFacturaErrors);
    
    // Si hay errores en las facturas, añadirlos a los errores generales
    if (hasFacturaErrors) {
      newErrors.facturaGeneral = 'Hay facturas sin adjuntar';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Si no hay facturas añadidas, agregar al menos una para validación
    if (formData.facturas.length === 0) {
      addFactura();
      return;
    }
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0 || facturaErrors.some(error => error !== '')) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulamos el envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Formulario enviado:', formData);
      
      // Resetear el formulario después de enviarlo
      setFormData({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        facturas: []
      });
      
      setFacturaErrors([]);
      setSubmitSuccess(true);
      
      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Formulario de Solicitud</h2>
      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          ¡Formulario enviado correctamente!
        </div>
      )}
      
      {errors.form && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
          </div>
          
          {/* Apellido */}
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.apellido ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.apellido && <p className="mt-1 text-sm text-red-600">{errors.apellido}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: 612345678"
              className={`w-full px-3 py-2 border rounded-md ${errors.telefono ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>
        
        {/* Sección de facturas */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Facturas (PDF, DOC, DOCX) - Máximo 10
            </label>
            <button
              type="button"
              onClick={addFactura}
              disabled={formData.facturas.length >= 10}
              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Añadir Factura
            </button>
          </div>

          {formData.facturas.length === 0 && (
            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500">No hay facturas añadidas. Haz clic en "Añadir Factura" para comenzar.</p>
              {errors.facturas && <p className="mt-1 text-sm text-red-600">{errors.facturas}</p>}
            </div>
          )}

          {formData.facturas.length > 0 && (
            <div className="space-y-4">
              {formData.facturas.map((factura, index) => (
                <div key={index} className="flex items-start border rounded-md p-3">
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Factura {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFactura(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </div>
                    <input
                      type="file"
                      id={`factura-${index}`}
                      onChange={(e) => handleFileChange(e, index)}
                      accept=".pdf,.doc,.docx"
                      className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${facturaErrors[index] ? 'border-red-500' : ''}`}
                    />
                    {factura && (
                      <p className="mt-1 text-sm text-green-600">
                        Archivo seleccionado: {factura.name}
                      </p>
                    )}
                    {facturaErrors[index] && (
                      <p className="mt-1 text-sm text-red-600">{facturaErrors[index]}</p>
                    )}
                  </div>
                </div>
              ))}
              {errors.facturaGeneral && (
                <p className="mt-1 text-sm text-red-600">{errors.facturaGeneral}</p>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
          </button>
        </div>
      </form>
    </div>
  );
}
