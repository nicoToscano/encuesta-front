"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Encuesta from "../encuesta";
import VerRespuestas from "../verrespuestas";
import ButtonSignout from "../buttonSignout";

export default function Home() {
  const router = useRouter();
  const [preguntas, setPreguntas] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [usuarioNombre, setUsuarioNombre] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("usuario_id");
    const nombre = localStorage.getItem("usuario_nombre");

    if (!id) {
      router.replace("/"); // Redirige al login si no está logueado
    } else {
      setUsuarioId(id);
      setUsuarioNombre(nombre);
    }
  }, []);

  useEffect(() => {
    const fetchPreguntas = async () => {
      const res = await fetch("https://encuesta-back.onrender.com/encuestas/preguntas");
      const data = await res.json();
      setPreguntas(data);
    };

    fetchPreguntas();
  }, []);

  if (!preguntas) return <p>Cargando preguntas...</p>;

  return (
    <>
      <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-semibold mb-4">
          Bienvenido, {usuarioNombre} 👋
        </h1>
        <ButtonSignout
          onSignout={() => {
            localStorage.removeItem("usuario_id");
            localStorage.removeItem("usuario_nombre");
            window.location.href = "/";
          }}
        />
      </div>

      <Encuesta preguntas={preguntas} usuario_id={usuarioId} />
      {/* <VerRespuestas /> */}
    </>
  );
}
