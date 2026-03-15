import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SignatureCanvas({ onSave }) {
  const canvasRef = useRef();
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const start = () => setDrawing(true);
    const stop = () => setDrawing(false);
    const draw = (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseleave", stop);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mouseup", stop);
      canvas.removeEventListener("mouseleave", stop);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [drawing]);

  const handleSave = () => {
    const dataURL = canvasRef.current.toDataURL("image/png");
    onSave(dataURL);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Sign Below</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: "1px solid #000", cursor: "crosshair" }}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={handleSave}>Save Signature</button>
      </div>
    </div>
  );
}

export default function Details() {
  const { id } = useParams(); // person id from route
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [personData, setPersonData] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showSignature, setShowSignature] = useState(false);

  // Simulate fetching person data
  useEffect(() => {
    setPersonData({ id }); // keep minimal since Name/Position removed
  }, [id]);

  // Start camera when showCamera is true
  useEffect(() => {
    if (!showCamera) return;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    startCamera();
  }, [showCamera]);

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    setCapturedPhoto(dataURL);
    setShowSignature(true);
  };

  const handleSignatureSave = (signature) => {
    navigate("/analytics", { state: { photo: capturedPhoto, signature } });
  };

  // Step 1: show button to start camera
  if (!showCamera) {
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setShowCamera(true)}>Capture Photo</button>
      </div>
    );
  }

  // Step 2: camera
  if (showCamera && !showSignature) {
    return (
      <div style={{ textAlign: "center" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width={400}
          height={300}
          style={{ border: "1px solid #000" }}
        />
        <div style={{ marginTop: 10 }}>
          <button onClick={handleCapture}>Capture & Continue</button>
        </div>
      </div>
    );
  }

  // Step 3: signature
  if (showSignature) {
    return <SignatureCanvas onSave={handleSignatureSave} />;
  }

  return null;
}
