"use client";

import Encuesta from "../encuesta";
import VerRespuestas from "../verrespuestas";
import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

export default function Home() {

  // const searchParams = useSearchParams();
  // const usuario_id = searchParams.get("usuario_id");

  const usuarioId = localStorage.getItem("usuario_id");

  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      const res = await fetch("http://localhost:3000/encuestas/preguntas");
      const data = await res.json();
      setPreguntas(data);
    };

    fetchPreguntas();
  }, []);

  if (!preguntas) return <p>Cargando preguntas...</p>;

  return (
    <>
      <Encuesta preguntas={preguntas} usuario_id={usuarioId} />
      <VerRespuestas />
    </>
  );
}
