
const Preview = ({image}) => {
  return (
    <>
    <h2>Current Playing</h2>
          <img src={image} alt={`Dropped Image`} className="screenCard_image" />
    </>
  )
}

export default Preview