import { useRef, useEffect, useState } from "react";

export default function SignatureCanvas({ photo, onSave }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the photo first
    if (photo) {
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
      };
    } else {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
    }

    const startDrawing = (e) => {
      setDrawing(true);
      ctx.beginPath();
      const rect = canvas.getBoundingClientRect();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    };

    const stopDrawing = () => setDrawing(false);

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [photo, drawing]);

  const save = () => {
    if (!canvasRef.current) return;
    const mergedImg = canvasRef.current.toDataURL("image/png");
    onSave(mergedImg); // send merged photo + signature
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black", cursor: "crosshair", display: "block" }}
      />
      <br />
      <button onClick={save}>Save Signature</button>
    </div>
  );
}
