"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "react-hook-form";
import Swal from "sweetalert2";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://encuesta-back.onrender.com/encuestas/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contrasena }),
    });

    const data = await res.json();

    if (data.success) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: `Bienvenido ${data.usuario.nombre}`,
      });

      // Guardamos el ID del usuario y el nombre para usarlo después
      localStorage.setItem("usuario_id", data.usuario.id);
      localStorage.setItem("usuario_nombre", data.usuario.nombre);
      // Redirigimos a la encuesta
      router.push("/home");
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Correo o contraseña incorrectos",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-lg h-screen md:h-[75vh] shadow-lg md:w-3/4 lg:w-1/2">
        <div className="space-y-6 rounded-lg sm:w-1/2 h-full flex items-center justify-center">
          <img src="/finanza.png" alt="Logo" className="" />
        </div>

        <form
          onSubmit={handleLogin}
          className="p-6 space-y-6 rounded-lg sm:w-1/2 h-full flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Iniciar sesión
          </h1>

          <input
            type="email"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <input
            type="password"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-yellow-300 text-black p-3 w-full rounded-lg hover:bg-yellow-400 transition duration-300 cursor-pointer"
          >
            Siguiente
          </button>

          <p className="text-center text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-yellow-500 hover:underline">
              Regístrate
            </Link>
          </p>

          <p className="text-center text-gray-600">
            ¿Olvidaste tu contraseña?{" "}
            <Link href="/forgot-password" className="text-yellow-500 hover:underline">
              Recuperar contraseña
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
