"use client";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import CanvasDibujo from "./canvasdibujo";
import { useRouter } from "next/navigation";

import Swal from 'sweetalert2'

const Encuesta = ({ preguntas, usuario_id }) => {
  const { control, handleSubmit, register } = useForm();
  const [progreso, setProgreso] = useState(0);
  const router = useRouter();
  const respuestas = useWatch({ control });

  useEffect(() => {
    if (!respuestas) return;

    const respondidas = Object.values(respuestas).filter(
      (val) => val !== "" && val !== null && val !== undefined
    ).length;

    const porcentaje = Math.round((respondidas / preguntas.length) * 100);
    setProgreso(porcentaje);
  }, [respuestas, preguntas.length]);

  const onSubmit = async (data) => {
    const respuestas = Object.entries(data).map(([key, value]) => ({
      usuario_id,
      pregunta_id: key,
      respuesta: value,
    }));

    await fetch("http://localhost:3000/encuestas/respuestas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(respuestas),
    });

    Swal.fire({
      title: "Gracias por tu respuesta!",
      text: "",
      icon: "success"
    });

    router.push('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-3xl shadow-xl space-y-8"
    >
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
        Encuesta
      </h1>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className="h-full bg-yellow-400 transition-all duration-500"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>
      <p className="text-sm text-center text-gray-600">{progreso}% completado</p>

      {preguntas.map((pregunta) => (
        <div
          key={pregunta.id}
          className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-5 transition hover:shadow-md"
        >
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            {pregunta.contenido}
          </label>

          {pregunta.tipo_pregunta === "texto" ? (
            <input
              {...register(pregunta.id)}
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Tu respuesta"
            />
          ) : pregunta.tipo_pregunta === "canvas" ? (
            <CanvasDibujo preguntaId={pregunta.id} control={control} />
          ) : (
            <Controller
              name={pregunta.id}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  <option value="">Selecciona una opción</option>
                  {pregunta.opciones.map((op, idx) => (
                    <option key={idx} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              )}
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold py-3 px-6 rounded-xl shadow-lg"
      >
        Enviar Respuestas
      </button>
    </form>
  );
};

export default Encuesta;
