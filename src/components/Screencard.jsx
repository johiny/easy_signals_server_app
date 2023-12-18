import "./screencard.css"
import { useState, useEffect } from "react"
import Preview from "./Preview";
import { checkFile } from "../utils/mediaUtils";
import MiniLoader from "./MiniLoader";
const Screencard = ({screen_id, index}) => {
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
    const [loading, setLoading] = useState(false);

    const handleDrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      console.log(files)
      if (files.length > 0) {
        try{
        const reader = new FileReader();
        let filetype = checkFile(files[0])
        if(filetype === false){
          window.alert("File type not supported or too big")
          return
        }
        reader.onload = () => {
          setFile({type: filetype, file: reader.result});
          setLoading(false)
        }
        reader.readAsDataURL(files[0]);
        setLoading(true)
      }
      catch(e){
        console.log(e)
        window.alert("error uploading file")
        setLoading(false)
        return
      }
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
        { loading && <MiniLoader/>}
        {file ? 
        <Preview file={file} setLoading={setLoading}/> : 
        <>
        <h2>Screen {index + 1}</h2>
        <h2>Drop files here max 200MB</h2>
        </>
        }
    </div>
  )
}

export default Screencard