
const Preview = ({file, setLoading}) => {
  return (
    <>
    <h2>Current Playing</h2>
          { file.type === 'image' ?
            <img src={file.file} alt={`Dropped Image`} className="screenCard_preview" /> :
            <video src={file.file} autoPlay controls muted loop playsInline onLoad={() => setLoading(false)} alt={`Dropped Video`} className="screenCard_preview" />
          }
    </>
  )
}

export default Preview