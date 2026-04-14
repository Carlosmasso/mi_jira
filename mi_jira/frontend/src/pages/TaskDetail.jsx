import React from "react";
import { useParams } from "react-router-dom";

export default function TaskDetail() {
  const { id } = useParams();
  // Aquí puedes hacer fetch de la tarea por id y mostrar los detalles
  return (
    <div style={{ padding: 32 }}>
      <h2>Detalle de la tarea</h2>
      <p>ID: {id}</p>
      {/* Aquí van los detalles de la tarea */}
    </div>
  );
}
