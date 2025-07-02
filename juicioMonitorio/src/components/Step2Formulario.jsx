// src/components/Step2Formulario.jsx

import React, { useState } from "react";

const Step2Formulario = ({ data, setData, onNext, onBack }) => {
  const [localData, setLocalData] = useState({
    campo1: data.campo1 || "",
    campo2: data.campo2 || "",
    // Añade más campos si los necesitas
  });

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(localData);
    onNext();
    // Aquí después podrás hacer la llamada real al backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl mb-4">Formulario</h2>
      <input
        name="campo1"
        placeholder="Campo 1"
        value={localData.campo1}
        onChange={handleChange}
        className="mb-2 p-2 w-full border rounded"
        required
      />
      <input
        name="campo2"
        placeholder="Campo 2"
        value={localData.campo2}
        onChange={handleChange}
        className="mb-4 p-2 w-full border rounded"
        required
      />
      {/* Aquí puedes poner más inputs según lo que necesites */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default Step2Formulario;
