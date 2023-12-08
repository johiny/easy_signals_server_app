import { useState } from "react"
import useInterval from "../customHooks/useInterval"
const PreviewSlider = ({images}) => {
    const [index, setindex] = useState(0)
    const imageChanger = () => {
            if(index < images.length - 1){
                setindex((prev) => prev + 1)
              }
              else{
                setindex(0)
              }
        }
    useInterval(imageChanger, 3000)
  return (
    <>
          <h2>Current Playing</h2>
          <img src={images[index]} alt={`Dropped Image`} className="screenCard_image" />
    </>
  )
}

export default PreviewSlider