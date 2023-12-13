
const Preview = ({file}) => {
  return (
    <>
    <h2>Current Playing</h2>
          { file.type === 'image' ?
            <img src={file.file} alt={`Dropped Image`} className="screenCard_image" /> :
            <video src={file.file} autoPlay controls muted loop playsInline alt={`Dropped Video`} className="screenCard_image" />
          }
    </>
  )
}

export default Preview