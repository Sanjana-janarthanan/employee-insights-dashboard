import { useRef, useEffect } from "react";

export default function CameraCapture({ onCapture }) {

  const videoRef = useRef();

  useEffect(()=>{

    navigator.mediaDevices.getUserMedia({video:true})
      .then(stream=>{
        videoRef.current.srcObject = stream;
      });

  },[]);

  const capture = ()=>{

    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(videoRef.current,0,0,400,300);

    const img = canvas.toDataURL("image/png");

    onCapture(img);

  };

  return(

    <div>

      <video ref={videoRef} autoPlay width="400"/>

      <br/>

      <button onClick={capture}>
        Capture Photo
      </button>

    </div>

  );
}
