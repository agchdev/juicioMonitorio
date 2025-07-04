import React, { useState } from "react";
import Step1Personal from "../components/Step1Personal";
import Step2Formulario from "../components/Step2Formulario";
import Step3Facturas from "../components/Step3Facturas";

// Obtener la URL de la API desde las variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Form = () => {
  const [step, setStep] = useState(1);
  // Inicializar datos personales desde localStorage si existen
  const [personalData, setPersonalData] = useState(() => {
    const savedData = localStorage.getItem('personalData');
    return savedData ? JSON.parse(savedData) : {};
  });
  const [formData, setFormData] = useState({});
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Función para actualizar datos personales
  const updatePersonalData = (data) => {
    setPersonalData(data);
    localStorage.setItem('personalData', JSON.stringify(data));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const steps = [
    { number: 1, title: "Datos Personales", description: "Información básica" },
    { number: 2, title: "Formulario", description: "Detalles del caso" },
    { number: 3, title: "Documentos", description: "Subir archivos" }
  ];

  // Función para enviar el formulario completo por email
  const handleSend = async () => {
    setLoading(true);
    try {
      // Usamos FormData para enviar también los archivos
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify({ personalData, formData }));
      // facturas debe ser array de File
      facturas.forEach(file => {
        formDataToSend.append("facturas", file);
      });

      const res = await fetch(`${API_URL}/api/enviar-documentos`, {
        method: "POST",
        body: formDataToSend
      });

      if (res.ok) setSuccess(true);
      else throw new Error("Error enviando el formulario");
    } catch (error) {
      alert("Error enviando el formulario: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-4">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Juicio Monitorio</h1>
            <span className="text-gray-400 text-sm">Paso {step} de {steps.length}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    step >= stepItem.number 
                      ? 'bg-blue-800 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step > stepItem.number ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      stepItem.number
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className={`font-medium text-sm ${
                      step >= stepItem.number ? 'text-white' : 'text-gray-400'
                    }`}>
                      {stepItem.title}
                    </div>
                    <div className="text-xs text-gray-500">{stepItem.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step > stepItem.number ? 'bg-blue-800' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 flex flex-col items-center">
          {success ? (
            <div className="text-green-400 text-xl font-bold">¡Formulario enviado correctamente!</div>
          ) : (
            <>
              {step === 1 && (
                <div className="w-full max-w-lg">
                  <Step1Personal
                    data={personalData}
                    setData={updatePersonalData}
                    onNext={nextStep}
                  />
                </div>
              )}
              {step === 2 && (
                <div className="w-full max-w-xl">
                  <Step2Formulario
                    data={formData}
                    setData={setFormData}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                </div>
              )}
              {step === 3 && (
                <div className="w-full max-w-xl">
                  <Step3Facturas
                    files={facturas}
                    setFiles={setFacturas}
                    onBack={prevStep}
                    onSubmit={handleSend} // <-- Añade esta prop
                    loading={loading}     // <-- Opcional, para deshabilitar botón
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
