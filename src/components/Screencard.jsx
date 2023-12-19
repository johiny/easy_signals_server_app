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
      if (files.length > 0) {
        try{
          if(checkFile(files[0])){
            setLoading(true)
            window.ipcRenderer.send('update_screen', {screen_id: screen_id, file: {filetype: files[0].type, filepath: files[0].path, name: files[0].name}})
          }
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
      window.ipcRenderer.on('screen_updated', (event, file) => {
        if(file.screen == screen_id){
        setFile(file)
        setLoading(false)
        }
      })
    },[screen_id])

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
        <Preview file={file} setLoading={setLoading} screen_id={screen_id}/> : 
        <>
        <h2>Screen {index + 1}</h2>
        <h2>Drop files here max 200MB</h2>
        </>
        }
    </div>
  )
}

export default Screencard