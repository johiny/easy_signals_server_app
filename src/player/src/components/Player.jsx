/* eslint-disable react/prop-types */
const protocol = 'http'
import './Player.css'
const Player = ({file, screen_id, setLoading, ip}) => {
  return (
    <div className='playerContainer'>
      {file == null ? (
        <h1>Agrega alguna imagen a tu pantalla</h1>
      ) 
      :
       file.filetype.includes("image") ? (
        <img
        className='playerImage'
          src={`${protocol}://${ip}:3000/currentfile/${screen_id}/${file.name}`}
          onLoad={() => setLoading(false)}
        />
      ) : 
      (
        <video
          className='playerVideo'
          src={`${protocol}://${ip}:3000/currentfile/${screen_id}/${file.name}`}
          autoPlay
          onLoadedData={() => setLoading(false)}
          controls
          muted
        />
      )}
    </div>
  );
};

export default Player
