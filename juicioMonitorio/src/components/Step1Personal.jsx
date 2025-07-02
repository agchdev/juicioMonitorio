// src/components/Step1Personal.jsx

import React, { useState } from "react";

const Step1Personal = ({ data, setData, onNext }) => {
  const [localData, setLocalData] = useState({
    nombre: data.nombre || "",
    apellido: data.apellido || "",
    correo: data.correo || "",
    numero: data.numero || "",
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
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl mb-4">Datos personales</h2>
      <input
        name="nombre"
        placeholder="Nombre"
        value={localData.nombre}
        onChange={handleChange}
        className="mb-2 p-2 w-full border rounded"
        required
      />
      <input
        name="apellido"
        placeholder="Apellido"
        value={localData.apellido}
        onChange={handleChange}
        className="mb-2 p-2 w-full border rounded"
        required
      />
      <input
        name="correo"
        type="email"
        placeholder="Correo"
        value={localData.correo}
        onChange={handleChange}
        className="mb-2 p-2 w-full border rounded"
        required
      />
      <input
        name="numero"
        placeholder="Número"
        value={localData.numero}
        onChange={handleChange}
        className="mb-4 p-2 w-full border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Siguiente
      </button>
    </form>
  );
};

export default Step1Personal;
