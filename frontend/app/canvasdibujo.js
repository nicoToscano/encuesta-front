import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const CanvasDibujo = ({ nombreCampo, control }) => {
  const sigCanvas = useRef(null);

  const guardarDibujo = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    control.setValue(nombreCampo, dataUrl);
  };

  return (
    <div>
      <SignatureCanvas ref={sigCanvas} canvasProps={{ className: "border w-full h-40" }} />
      <button type="button" onClick={guardarDibujo} className="bg-green-500 text-white p-2 mt-2">
        Guardar Dibujo
      </button>
    </div>
  );
};

export default CanvasDibujo;
