"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const router = useRouter();


  const handleGet = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    try {
      if (!correo) {
        alert("Por favor, ingresa un correo.");
        return;
      }
  
      // Realizamos la solicitud al endpoint con el correo como parámetro
      const res = await fetch(`http://localhost:3000/encuestas/usuarios/${correo}`);
      if (!res.ok) {
        throw new Error("Error al obtener el usuario");
      }
  
      // Obtenemos la respuesta del servidor
      const usuarioExistente = await res.json();
  
      if (usuarioExistente) {
        alert(`El correo ya existe en la base de datos: ${JSON.stringify(usuarioExistente)}`);
      } else {
        console.log("El correo no existe en la base de datos.");
      }
    } catch (error) {
      console.error("Error en handleGet:", error);
      alert("Hubo un error al obtener el usuario. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-lg mx-8 h-[75vh]">
        <div className="p-6 space-y-6 rounded-lg sm:w-1/2 h-full flex items-center justify-center">
          <img src="/finanza.png" alt="Logo" className="" />
        </div>

        <form
          onSubmit={handleGet}
          className="p-6 space-y-6 rounded-lg sm:w-1/2 h-full flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Iniciar sesión
          </h1>
          
          <input
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-yellow-300 text-black p-3 w-full rounded-lg hover:bg-yellow-400 transition duration-300 cursor-pointer"
          >
            Siguiente
          </button>
        </form>
      </div>
    </div>
  );
}
