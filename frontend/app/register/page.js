"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/encuestas/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, contrasena }),
    });

    const data = await res.json();

    // Guardamos el ID del usuario para usarlo después
    localStorage.setItem("usuario_id", data.id);

    // Redirigimos a la encuesta
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-lg mx-8 h-[75vh]">
        <div className="p-6 space-y-6 rounded-lg sm:w-1/2 h-full flex items-center justify-center">
          <img src="/finanza.png" alt="Logo" className="" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 rounded-lg sm:w-1/2 h-full flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Registro
          </h1>
          <input
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Correo"
            type="email"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-yellow-300 text-black p-3 w-full rounded-lg hover:bg-yellow-400 transition duration-300 cursor-pointer"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
