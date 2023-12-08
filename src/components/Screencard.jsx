import "./screencard.css"
import { useState, useEffect } from "react"
import PreviewSlider from "./previewSlider";
const Screencard = () => {
    const [images, setImages] = useState([]);
    const handleDrop = (event) => {
      event.preventDefault();
  
      const files = event.dataTransfer.files;
  
      if (files.length > 0) {
        const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    }
  return (
    <div
      className="screenCard"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(e) => handleDrop(e)}
    >
      <h1>Drop files here</h1>
      { images.length > 0 &&
          <PreviewSlider images={images}/>
        }
    </div>
  )
}

export default Screencard