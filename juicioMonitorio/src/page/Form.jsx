// src/components/Form.jsx

import React, { useState } from "react";
import Step1Personal from "../components/Step1Personal";
import Step2Formulario from "../components/Step2Formulario";

const Form = () => {
  const [step, setStep] = useState(1);
  // Aquí puedes centralizar los datos de todos los pasos si quieres pasarlos entre componentes:
  const [personalData, setPersonalData] = useState({});
  const [formData, setFormData] = useState({});
  const [facturas, setFacturas] = useState([]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      {step === 1 && (
        <Step1Personal
          data={personalData}
          setData={setPersonalData}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <Step2Formulario
          data={formData}
          setData={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <Step3Facturas
          files={facturas}
          setFiles={setFacturas}
          onBack={prevStep}
        />
      )}
    </div>
  );
};

export default Form;
