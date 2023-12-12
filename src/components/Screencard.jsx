import "./screencard.css"
import { useState, useEffect } from "react"
import PreviewSlider from "./previewSlider";
import Preview from "./Preview";
const Screencard = ({screen_id}) => {
    // multi image logic
    // const [images, setImages] = useState([]);
    // const handleDrop = (event) => {
    //   event.preventDefault();
  
    //   const files = event.dataTransfer.files;
  
    //   if (files.length > 0) {
    //     const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    //     setImages((prevImages) => [...prevImages, ...newImages]);
    //   }
    // }
    const [image, setImage] = useState(null);
    
    const handleDrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      console.log(files)
      if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        }
        reader.readAsDataURL(files[0]);
      }
    }

    useEffect(() => {
      if (!image) return;
      window.ipcRenderer.send('send_image', {screen_id: screen_id, image: image})
    },[image, screen_id])

  return (
    <div
      className="screenCard"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(e) => handleDrop(e)}
    >
      
      { // multi image logic
      /* { images.length > 0 &&
          <PreviewSlider images={images}/>
        } */}
        {image ? 
        <Preview image={image}/> : 
        <h1>Drop files here</h1>
        }
    </div>
  )
}

export default Screencard