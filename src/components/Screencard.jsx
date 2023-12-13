import "./screencard.css"
import { useState, useEffect } from "react"
import Preview from "./Preview";
import { getFileType } from "../utils/mediaUtils";
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
    const [file, setFile] = useState(null);

    const handleDrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      console.log(files)
      if (files.length > 0) {
        const reader = new FileReader();
        let filetype = getFileType(files[0])
        if(filetype === false){
          window.alert("File type not supported")
          return
        }
        reader.onload = () => {
          setFile({type: filetype, file: reader.result});
        }
        reader.readAsDataURL(files[0]);
      }
    }

    useEffect(() => {
      if (!file) return;
      window.ipcRenderer.send('send_file', {screen_id: screen_id, file: file})
    },[file, screen_id])

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
        {file ? 
        <Preview file={file}/> : 
        <h1>Drop files here</h1>
        }
    </div>
  )
}

export default Screencard