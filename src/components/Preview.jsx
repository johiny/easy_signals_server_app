const Preview = ({file, setLoading, screen_id}) => {
  
  return (
    <>
    <h2>Current Playing </h2>
          { file.filetype.includes('image') ?
            <img key={file.name} src={`http://localhost:3000/currentfile/${screen_id}/${file.name}`} alt={`Dropped Image`} className="screenCard_preview" /> :
            <video key={file.name}  src={`http://localhost:3000/currentfile/${screen_id}/${file.name}}`} autoPlay controls muted loop playsInline onLoad={() => setLoading(false)} alt={`Dropped Video`} className="screenCard_preview" />
          }
    </>
  )
}

export default Preview