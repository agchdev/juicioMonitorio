// src/components/Step2Formulario.jsx

import React, { useState } from "react";
import jsPDF from 'jspdf';

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

  // Función para generar el PDF con formato legal
  const generatePDF = (formData, personalData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let y = 30;

    // Configurar fuente
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Encabezado
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    const header = "AL JUZGADO DE PRIMERA INSTANCIA DE GRANADA";
    const headerWidth = doc.getTextWidth(header);
    doc.text(header, (pageWidth - headerWidth) / 2, y);
    y += 20;

    // Introducción del procurador
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const intro = `${deudorCompleto}, Procurador de los Tribunales, en nombre de LAMITOOLS INGENIERÍA S.L, cuya representación acreditaré mediante comparecencia "apud acta" y asistido del Letrado del Ilustre Colegio de Abogados de Granada, José Manuel Aguayo Pozo, Colegiado 3031, como mejor proceda en derecho, comparezco y DIGO:`;
    
    const introLines = doc.splitTextToSize(intro, pageWidth - 40);
    doc.text(introLines, 20, y);
    y += introLines.length * 6 + 10;

    // Convertir cantidad a letras (función básica)
    const convertirCantidadALetras = (cantidad) => {
      // Implementación básica - se puede mejorar
      const num = parseFloat(cantidad || 0);
      return num.toLocaleString('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
        minimumFractionDigits: 2 
      }).replace('€', '').trim().toUpperCase() + ' EUROS';
    };

    // Petición inicial con datos reales
    const importeLetras = convertirCantidadALetras(formData.importeTotal);
    const deudorCompleto = `${formData.datosDeudor?.nombre || ''} ${formData.datosDeudor?.apellidos || ''}`.trim();
    const direccionCompleta = `${formData.datosDeudor?.direccion || ''}, ${formData.datosDeudor?.ciudad || ''}, ${formData.datosDeudor?.codigoPostal || ''} ${formData.datosDeudor?.provincia || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '');
    
    const peticion = `Que en la representación que ostento y siguiendo instrucciones de mi mandante, por medio del presente escrito formulo PETICIÓN INICIAL DE PROCEDIMIENTO MONITORIO en reclamación de ${importeLetras} (${formData.importeTotal || '0,00'}€) de principal, en contra de ${deudorCompleto || 'DEUDOR NO ESPECIFICADO'}, con domicilio en ${direccionCompleta || 'DIRECCIÓN NO ESPECIFICADA'}, en base a los hechos que a continuación se detallan:`;
    
    const peticionLines = doc.splitTextToSize(peticion, pageWidth - 40);
    doc.text(peticionLines, 20, y);
    y += peticionLines.length * 6 + 15;

    // Sección HECHOS
    doc.setFont("helvetica", "bold");
    const hechos = "HECHOS";
    const hechosWidth = doc.getTextWidth(hechos);
    doc.text(hechos, (pageWidth - hechosWidth) / 2, y);
    y += 15;

    doc.setFont("helvetica", "bold");
    doc.text("PRIMERO: ORIGEN Y CUANTÍA DE LA DEUDA", 20, y);
    y += 10;
    
    doc.setFont("helvetica", "normal");
    const hecho1 = `En virtud de las relaciones comerciales existentes entre las partes, mi mandante ha procedido al suministro de materiales consistentes en perfilería de aluminio y accesorios necesarios para la ejecución de diversos trabajos de obra, en cumplimiento con los acuerdos establecidos. Dichos materiales fueron entregados de conformidad con las necesidades y especificaciones previamente acordadas con la parte demandada, quien se comprometió al pago de los mismos.`;
    
    const hecho1Lines = doc.splitTextToSize(hecho1, pageWidth - 40);
    doc.text(hecho1Lines, 20, y);
    y += hecho1Lines.length * 6 + 10;

    // Agregar nueva página si es necesario
    if (y > 250) {
      doc.addPage();
      y = 30;
    }

    // Detalles de las facturas con datos del formulario
    const facturaInfo = `Por los suministros entregados se han devengado las siguientes facturas, que se acompañan junto con sus albaranes correspondientes:

• Facturación relacionada con el importe reclamado de ${formData.importeTotal || '0.00'}€
• Fecha de factura: ${formData.fechaFactura || 'No especificada'}
• Descripción: ${formData.descripcionDeuda || 'Suministros diversos'}

El importe total adeudado asciende a ${formData.importeTotal || '0.00'} EUROS, correspondiente a los suministros entregados, mencionados y documentados.`;
    
    const facturaLines = doc.splitTextToSize(facturaInfo, pageWidth - 40);
    doc.text(facturaLines, 20, y);
    y += facturaLines.length * 6 + 10;

    // SEGUNDO hecho
    doc.setFont("helvetica", "bold");
    doc.text("SEGUNDO: DE LA RECLAMACIÓN EXTRAJUDICIAL", 20, y);
    y += 10;
    
    doc.setFont("helvetica", "normal");
    const hecho2 = `En este sentido, se intentó requerir el pago mediante burofax enviado con fecha 24 de Octubre de 2024, cuya copia que se acompaña como documento número siete. Todas las gestiones amistosas realizadas con la demandada para intentar solventar la controversia han resultado infructuosas por cuanto no ha quedado otra alternativa que la interposición de la presente para reclamar la suma pendiente de pago conforme a las facturas acompañadas.`;
    
    const hecho2Lines = doc.splitTextToSize(hecho2, pageWidth - 40);
    doc.text(hecho2Lines, 20, y);
    y += hecho2Lines.length * 6 + 15;

    // Fundamentos de derecho
    if (y > 220) {
      doc.addPage();
      y = 30;
    }

    doc.setFont("helvetica", "bold");
    const fundamentos = "FUNDAMENTOS DE DERECHO";
    const fundamentosWidth = doc.getTextWidth(fundamentos);
    doc.text(fundamentos, (pageWidth - fundamentosWidth) / 2, y);
    y += 15;

    doc.setFont("helvetica", "bold");
    doc.text("-I-", (pageWidth - doc.getTextWidth("-I-")) / 2, y);
    y += 10;
    
    doc.setFont("helvetica", "normal");
    const competencia = `Competencia: De conformidad con lo establecido en el artículo 813 de la Ley 1/2000 de Enjuiciamiento Civil es competente el Juzgado de Primera Instancia del domicilio del deudor.`;
    const competenciaLines = doc.splitTextToSize(competencia, pageWidth - 40);
    doc.text(competenciaLines, 20, y);
    y += competenciaLines.length * 6 + 10;

    const procedimiento = `Procedimiento: El procedimiento monitorio aparece regulado en el artículo 814 de la misma Ley 1/2000.`;
    const procedimientoLines = doc.splitTextToSize(procedimiento, pageWidth - 40);
    doc.text(procedimientoLines, 20, y);
    y += procedimientoLines.length * 6 + 10;

    const cuantia = `Cuantía: La cuantía de la deuda queda fijada en la suma de ${importeLetras} (${formData.importeTotal || '0,00'}€) de principal.`;
    const cuantiaLines = doc.splitTextToSize(cuantia, pageWidth - 40);
    doc.text(cuantiaLines, 20, y);
    y += cuantiaLines.length * 6 + 15;

    // Aplicación del artículo
    doc.setFont("helvetica", "bold");
    doc.text("-II-", (pageWidth - doc.getTextWidth("-II-")) / 2, y);
    y += 10;
    
    doc.setFont("helvetica", "normal");
    const articulo = `Es de aplicación el artículo 812.1.2º de la Ley 1/2000 de Enjuiciamiento Civil, al exigirse el pago de una deuda vencida, líquida y exigible representada por facturas y albaranes.`;
    const articuloLines = doc.splitTextToSize(articulo, pageWidth - 40);
    doc.text(articuloLines, 20, y);
    y += articuloLines.length * 6 + 10;

    const procedePor = `Por lo que procede y,`;
    doc.text(procedePor, 20, y);
    y += 15;

    // Súplica final
    if (y > 200) {
      doc.addPage();
      y = 30;
    }

    doc.setFont("helvetica", "bold");
    doc.text("SUPLICO AL JUZGADO:", 20, y);
    y += 10;
    
    doc.setFont("helvetica", "normal");
    const suplica = `Que teniendo por presentado este escrito con los documentos y copias que se acompañan, se sirva admitirlos y me tenga por personado en nombre de LAMITOOLS INGENIERÍA S.L y por formulada PETICIÓN INICIAL DE PROCESO MONITORIO en contra de ${deudorCompleto || 'DEUDOR NO ESPECIFICADO'}, a fin de que se requiera al deudor para que en el plazo de veinte días, pague la cantidad que se reclama ascendente a la suma de ${importeLetras} (${formData.importeTotal || '0,00'}€) de principal; y para el caso de que en dicho plazo no atienda el requerimiento, se compulse alegando razones de la negativa de pago, se dicte decreto dando por terminado el proceso monitorio y se me dé traslado del mismo para que pueda instar el despacho de ejecución; que si el deudor se opone por escrito alegando razones para negarse total o parcialmente al pago, se dé por terminado el monitorio y se acuerde seguir por los trámites del juicio verbal, dándome traslado de la oposición para poder ser impugnada, todo ello por ser de justicia que pido.`;
    
    const suplicaLines = doc.splitTextToSize(suplica, pageWidth - 40);
    doc.text(suplicaLines, 20, y);
    y += suplicaLines.length * 6 + 15;

    // Fecha y lugar
    const fecha = `En Granada a 20 de Noviembre de 2024.`;
    doc.text(fecha, 20, y);

    // Guardar el PDF
    doc.save('jm.pdf');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generar el PDF antes de continuar
    const personalData = JSON.parse(localStorage.getItem('personalData') || '{}');
    generatePDF(localData, personalData);
    
    setData(localData);
    onNext();
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
