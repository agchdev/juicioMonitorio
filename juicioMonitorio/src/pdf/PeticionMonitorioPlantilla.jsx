import React from "react";

export default function PeticionMonitorioPlantilla({ datos }) {
  return (
    <div id="pdf-content" style={{ padding: 30, background: "#fff", color: "#000", fontSize: 14 }}>
      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
        AL JUZGADO DE PRIMERA INSTANCIA DE GRANADA
      </h3>
      <p>
        D./Dña. <b>{datos.representante || "NOMBRE DEL REPRESENTANTE"}</b>, Procurador de los Tribunales, en nombre de <b>{datos.nombreDemandante || "NOMBRE DEMANDANTE"}</b>, cuya representación acreditaré mediante comparecencia “apud acta” y asistido del Letrado del Ilustre Colegio de Abogados de Granada, <b>{datos.letrado || "NOMBRE LETRADO"}</b>, Colegiado {datos.colegiado || "Nº COLEGIADO"}, como mejor proceda en derecho, comparezco y DIGO:
      </p>
      <p>
        Que siguiendo instrucciones de mi mandante, formulo PETICIÓN INICIAL DE PROCEDIMIENTO MONITORIO en reclamación de <b>{datos.cantidad || "CANTIDAD EN LETRAS"} ({datos.importe || "IMPORTE"} €)</b> de principal, en contra de <b>{datos.demandado || "NOMBRE DEMANDADO"}</b>, con CIF {datos.cifDemandado || "CIF DEMANDADO"} y domicilio en {datos.domicilioDemandado || "DOMICILIO DEMANDADO"}, en base a los hechos siguientes:
      </p>
      <h4>HECHOS</h4>
      <p>
        <b>PRIMERO.-</b> {datos.hechos || "Describe aquí el origen y cuantía de la deuda..."}
      </p>
      <p>
        <b>SEGUNDO.-</b> {datos.reclamacionExtrajudicial || "Indica si hubo requerimiento extrajudicial..."}
      </p>
      <h4>FUNDAMENTOS DE DERECHO</h4>
      <p>{datos.fundamentos || "Aquí puedes poner los fundamentos jurídicos..."}</p>
      <h4>SUPLICO AL JUZGADO</h4>
      <p>
        Que se requiera al deudor para que en el plazo de veinte días pague la cantidad reclamada y, en su defecto, se dicte decreto conforme a derecho.
      </p>
      <p style={{textAlign:"right"}}>En {datos.ciudad || "Ciudad"}, a {datos.fecha || "FECHA"}.</p>
    </div>
  );
}
