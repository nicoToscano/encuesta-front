"use client";
import { useState } from "react";

export default function VerRespuestas() {
  const [usuarioId, setUsuarioId] = useState("");
  const [respuestas, setRespuestas] = useState([]);

  const handleBuscar = async () => {
    const res = await fetch(`http://localhost:3000/encuestas/respuestas/${usuarioId}`);
    const data = await res.json();
    setRespuestas(data);
  };

  return (
    <div>
      <h1>Ver Respuestas</h1>
      <input type="text" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} placeholder="ID Usuario" />
      <button onClick={handleBuscar}>Buscar</button>
      <ul>
        {respuestas.map((resp, index) => (
          <li key={index}>{resp.respuesta}</li>
        ))}
      </ul>
    </div>
  );
}
