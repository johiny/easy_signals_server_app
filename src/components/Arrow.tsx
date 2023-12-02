import './arrow.css'
// eslint-disable-next-line @typescript-eslint/ban-types
const Arrow = ({action} : {action: Function}) => {
  return (
    <div className='arrow' onClick={() => action()}/>
  )
}

export default Arrow