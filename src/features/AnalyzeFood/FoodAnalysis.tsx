import { useRef, useState } from "react";
import styles from "./FoodAnalysis.module.css";
export default function FoodAnalysis() {
  const [hasCamera, setHasCamera] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Start camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasCamera(true);
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  // Take a photo by capturing the video frame
  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Set canvas dimensions to match video stream
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Draw the current video frame onto the canvas
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // Get the image data URL
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setImageSrc(dataUrl); // Set the image source
      }
    }
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>

      <div className={styles.imageContainer}>
        <video ref={videoRef} autoPlay width="100%" />
        <button onClick={takePhoto}>Take Photo</button>
      </div>

      {imageSrc && (
        <div className={styles.imageContainer}>
          <h3>Your Photo:</h3>
          <img className={styles.img} src={imageSrc} alt="Captured" />
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
