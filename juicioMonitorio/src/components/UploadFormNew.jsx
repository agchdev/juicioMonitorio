import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

export default function UploadForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Paso 1: Información personal
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    
    // Paso 2: Información para el documento PDF
    tipoReclamacion: 'deuda',
    fechaFactura: '',
    importeTotal: '',
    descripcionDeuda: '',
    datosDeudor: {
      nombre: '',
      apellidos: '',
      direccion: '',
      ciudad: '',
      codigoPostal: '',
      provincia: ''
    },
    
    // Paso 3: Facturas
    facturas: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [facturaErrors, setFacturaErrors] = useState([]);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  // Añadir una factura vacía al iniciar el componente
  useEffect(() => {
    if (formData.facturas.length === 0) {
      addFactura();
    }
  }, []);

  // Funciones para navegar entre pasos
  const nextStep = () => {
    const stepValidation = validateStep(currentStep);
    
    if (Object.keys(stepValidation).length === 0) {
      if (currentStep === 2) {
        generatePDF();
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setErrors(stepValidation);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Validar información personal
      if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
      if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
      
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
    } 
    
    else if (step === 2) {
      // Validar información del PDF
      if (!formData.fechaFactura) newErrors.fechaFactura = 'La fecha es obligatoria';
      if (!formData.importeTotal.trim()) {
        newErrors.importeTotal = 'El importe es obligatorio';
      } else if (isNaN(parseFloat(formData.importeTotal))) {
        newErrors.importeTotal = 'El importe debe ser un número';
      }
      if (!formData.descripcionDeuda.trim()) newErrors.descripcionDeuda = 'La descripción es obligatoria';
      
      // Validar datos del deudor
      if (!formData.datosDeudor.nombre.trim()) newErrors['datosDeudor.nombre'] = 'El nombre del deudor es obligatorio';
      if (!formData.datosDeudor.apellidos.trim()) newErrors['datosDeudor.apellidos'] = 'Los apellidos del deudor son obligatorios';
      if (!formData.datosDeudor.direccion.trim()) newErrors['datosDeudor.direccion'] = 'La dirección es obligatoria';
      if (!formData.datosDeudor.ciudad.trim()) newErrors['datosDeudor.ciudad'] = 'La ciudad es obligatoria';
      if (!formData.datosDeudor.codigoPostal.trim()) {
        newErrors['datosDeudor.codigoPostal'] = 'El código postal es obligatorio';
      } else if (!/^\d{5}$/.test(formData.datosDeudor.codigoPostal)) {
        newErrors['datosDeudor.codigoPostal'] = 'Introduce un código postal válido (5 dígitos)';
      }
      if (!formData.datosDeudor.provincia.trim()) newErrors['datosDeudor.provincia'] = 'La provincia es obligatoria';
    } 
    
    else if (step === 3) {
      // Validar facturas
      if (formData.facturas.length === 0) {
        newErrors.facturas = 'Debes adjuntar al menos una factura';
      } else {
        const newFacturaErrors = Array(formData.facturas.length).fill('');
        let hasFacturaErrors = false;
        
        formData.facturas.forEach((factura, index) => {
          if (!factura) {
            newFacturaErrors[index] = 'Debes adjuntar la factura';
            hasFacturaErrors = true;
          }
        });
        
        setFacturaErrors(newFacturaErrors);
        
        if (hasFacturaErrors) {
          newErrors.facturaGeneral = 'Hay facturas sin adjuntar';
        }
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Para campos anidados como datosDeudor.nombre
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      // Para campos simples
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Limpiar el error si el campo se está editando
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Función para generar PDF con los datos del formulario
  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Configuración inicial del PDF
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('RECLAMACIÓN DE DEUDA - JUICIO MONITORIO', 105, 15, { align: 'center' });
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('Fecha: ' + new Date().toLocaleDateString('es-ES'), 20, 30);
      
      // Datos del acreedor
      doc.setFont('helvetica', 'bold');
      doc.text('DATOS DEL ACREEDOR:', 20, 40);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombre: ${formData.nombre} ${formData.apellidos}`, 20, 48);
      doc.text(`Teléfono: ${formData.telefono}`, 20, 56);
      doc.text(`Email: ${formData.email}`, 20, 64);
      
      // Datos del deudor
      doc.setFont('helvetica', 'bold');
      doc.text('DATOS DEL DEUDOR:', 20, 80);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombre: ${formData.datosDeudor.nombre} ${formData.datosDeudor.apellidos}`, 20, 88);
      doc.text(`Dirección: ${formData.datosDeudor.direccion}`, 20, 96);
      doc.text(`Código Postal: ${formData.datosDeudor.codigoPostal}`, 20, 104);
      doc.text(`Ciudad: ${formData.datosDeudor.ciudad}`, 20, 112);
      doc.text(`Provincia: ${formData.datosDeudor.provincia}`, 20, 120);
      
      // Datos de la reclamación
      doc.setFont('helvetica', 'bold');
      doc.text('DATOS DE LA RECLAMACIÓN:', 20, 136);
      doc.setFont('helvetica', 'normal');
      doc.text(`Tipo de reclamación: ${formData.tipoReclamacion === 'deuda' ? 'Reclamación de deuda' : 'Otro'}`, 20, 144);
      doc.text(`Fecha de factura: ${formData.fechaFactura}`, 20, 152);
      doc.text(`Importe total: ${formData.importeTotal} €`, 20, 160);
      
      doc.setFont('helvetica', 'bold');
      doc.text('DESCRIPCIÓN DE LA DEUDA:', 20, 176);
      doc.setFont('helvetica', 'normal');
      
      // Dividir la descripción en líneas para que no se salga del PDF
      const descripcionLines = doc.splitTextToSize(formData.descripcionDeuda, 170);
      doc.text(descripcionLines, 20, 184);
      
      // Pie de página
      doc.setFontSize(10);
      doc.text('Este documento es una reclamación previa al inicio de un proceso judicial monitorio.', 105, 270, { align: 'center' });
      
      // Guardar el PDF y crear una URL para descargarlo
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setPdfGenerated(true);
      
      return url;
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      return null;
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
    const updatedFacturaErrors = [...facturaErrors];
    updatedFacturaErrors[index] = '';
    setFacturaErrors(updatedFacturaErrors);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar el último paso (facturas)
    const validationErrors = validateStep(3);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulamos el envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Respuesta exitosa simulada
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Mostrar mensaje de éxito durante 5 segundos y luego resetear el formulario
      setTimeout(() => {
        setSubmitSuccess(false);
        setCurrentStep(1);
        setPdfGenerated(false);
        setPdfUrl('');
        setFormData({
          // Paso 1: Información personal
          nombre: '',
          apellidos: '',
          telefono: '',
          email: '',
          
          // Paso 2: Información para el documento PDF
          tipoReclamacion: 'deuda',
          fechaFactura: '',
          importeTotal: '',
          descripcionDeuda: '',
          datosDeudor: {
            nombre: '',
            apellidos: '',
            direccion: '',
            ciudad: '',
            codigoPostal: '',
            provincia: ''
          },
          
          // Paso 3: Facturas
          facturas: [null]
        });
        setErrors({});
        setFacturaErrors(['']);
      }, 5000);
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setIsSubmitting(false);
      setErrors({
        submit: 'Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo.'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Formulario de Solicitud</h2>
      
      {/* Indicador de Pasos */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center w-full">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === step ? 'bg-blue-600 text-white' : currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                {currentStep > step ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Título del paso actual */}
      <h3 className="text-xl font-medium mb-6 text-gray-700">
        {currentStep === 1 && "Paso 1: Información Personal"}
        {currentStep === 2 && "Paso 2: Información de la Reclamación"}
        {currentStep === 3 && "Paso 3: Adjuntar Documentos"}
      </h3>
      
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
      
      <form onSubmit={currentStep === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        {/* Paso 1: Información Personal */}
        {currentStep === 1 && (
          <>
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
              
              {/* Apellidos */}
              <div>
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.apellidos ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.apellidos && <p className="mt-1 text-sm text-red-600">{errors.apellidos}</p>}
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
          </>
        )}

        {/* Paso 2: Información para el PDF */}
        {currentStep === 2 && (
          <>
            <div className="mb-4">
              <label htmlFor="tipoReclamacion" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Reclamación
              </label>
              <select
                id="tipoReclamacion"
                name="tipoReclamacion"
                value={formData.tipoReclamacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="deuda">Reclamación de Deuda</option>
                <option value="factura">Factura Impagada</option>
                <option value="contrato">Incumplimiento de Contrato</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="fechaFactura" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Factura/Documento
                </label>
                <input
                  type="date"
                  id="fechaFactura"
                  name="fechaFactura"
                  value={formData.fechaFactura}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.fechaFactura ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.fechaFactura && <p className="mt-1 text-sm text-red-600">{errors.fechaFactura}</p>}
              </div>

              <div>
                <label htmlFor="importeTotal" className="block text-sm font-medium text-gray-700 mb-1">
                  Importe Total (€)
                </label>
                <input
                  type="text"
                  id="importeTotal"
                  name="importeTotal"
                  value={formData.importeTotal}
                  onChange={handleChange}
                  placeholder="Ej: 1250.50"
                  className={`w-full px-3 py-2 border rounded-md ${errors.importeTotal ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.importeTotal && <p className="mt-1 text-sm text-red-600">{errors.importeTotal}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="descripcionDeuda" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción de la Deuda/Reclamación
              </label>
              <textarea
                id="descripcionDeuda"
                name="descripcionDeuda"
                value={formData.descripcionDeuda}
                onChange={handleChange}
                rows="3"
                className={`w-full px-3 py-2 border rounded-md ${errors.descripcionDeuda ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Detalla la naturaleza de la deuda o reclamación"
              ></textarea>
              {errors.descripcionDeuda && <p className="mt-1 text-sm text-red-600">{errors.descripcionDeuda}</p>}
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium mb-3">Datos del Deudor</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="datosDeudor.nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="datosDeudor.nombre"
                    name="datosDeudor.nombre"
                    value={formData.datosDeudor.nombre}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors['datosDeudor.nombre'] ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors['datosDeudor.nombre'] && <p className="mt-1 text-sm text-red-600">{errors['datosDeudor.nombre']}</p>}
                </div>
                
                <div>
                  <label htmlFor="datosDeudor.apellidos" className="block text-sm font-medium text-gray-700 mb-1">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="datosDeudor.apellidos"
                    name="datosDeudor.apellidos"
                    value={formData.datosDeudor.apellidos}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors['datosDeudor.apellidos'] ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors['datosDeudor.apellidos'] && <p className="mt-1 text-sm text-red-600">{errors['datosDeudor.apellidos']}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="datosDeudor.direccion" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="datosDeudor.direccion"
                  name="datosDeudor.direccion"
                  value={formData.datosDeudor.direccion}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors['datosDeudor.direccion'] ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors['datosDeudor.direccion'] && <p className="mt-1 text-sm text-red-600">{errors['datosDeudor.direccion']}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="datosDeudor.ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="datosDeudor.ciudad"
                    name="datosDeudor.ciudad"
                    value={formData.datosDeudor.ciudad}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors['datosDeudor.ciudad'] ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors['datosDeudor.ciudad'] && <p className="mt-1 text-sm text-red-600">{errors['datosDeudor.ciudad']}</p>}
                </div>

                <div>
                  <label htmlFor="datosDeudor.codigoPostal" className="block text-sm font-medium text-gray-700 mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    id="datosDeudor.codigoPostal"
                    name="datosDeudor.codigoPostal"
                    value={formData.datosDeudor.codigoPostal}
                    onChange={handleChange}
                    placeholder="28001"
                    className={`w-full px-3 py-2 border rounded-md ${errors['datosDeudor.codigoPostal'] ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors['datosDeudor.codigoPostal'] && <p className="mt-1 text-sm text-red-600">{errors['datosDeudor.codigoPostal']}</p>}
                </div>

                <div>
                  <label htmlFor="datosDeudor.provincia" className="block text-sm font-medium text-gray-700 mb-1">
                    Provincia
                  </label>
                  <input
                    type="text"
                    id="datosDeudor.provincia"
                    name="datosDeudor.provincia"
                    value={formData.datosDeudor.provincia}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors['datosDeudor.provincia'] ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors['datosDeudor.provincia'] && <p className="mt-1 text-sm text-red-600">{errors['datosDeudor.provincia']}</p>}
                </div>
              </div>
            </div>

            {pdfGenerated && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="font-medium text-blue-700 mb-2">PDF Generado correctamente</h4>
                <p className="text-sm mb-3">Se ha generado un documento PDF con la información proporcionada.</p>
                <a 
                  href={pdfUrl} 
                  download="reclamacion.pdf"
                  className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Descargar PDF
                </a>
              </div>
            )}
          </>
        )}

        {/* Paso 3: Facturas */}
        {currentStep === 3 && (
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
        )}
        
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Anterior
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ml-auto"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors ml-auto"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
