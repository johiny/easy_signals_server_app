import React from 'react'
import 'styles/dashboard.css'
import Screencard from 'components/Screencard'
import { useState, useEffect } from 'react'
const Dashboard = () => {
  const [activeScreens, setActiveScreens] = useState([]);
  const [hostIP, setHostIP] = useState('');
  useEffect(() => {
    window.ipcRenderer.send('get_screens');
    window.ipcRenderer.on('screens_change', (e, data) => {
      setActiveScreens(data);
    })
    window.ipcRenderer.send('get_ip')
    window.ipcRenderer.on('receive_ip', (e, data) => {
      setHostIP(data)
    })
  }, [])
  return (
    <div className='dashboard'>
      <div className='dashboard_container'>
    <h1 className='dashboard_title'>
        Easy Signals
    </h1>
        <span className='your_ip'>Your Server IP is : {hostIP}</span>
        <span className='player_link'>
          Go to <br/> <b>{hostIP}:3000/player</b> <br/>  or use the Android App
        </span>
    <div className='screenCards_Container'>
      { activeScreens.length > 0 ? 
      activeScreens.map((screen, index) => (
        <Screencard key={screen} screen_id={screen} index={index}/>
      )) : <h1>No hay pantallas conectadas</h1>}
    </div>
    </div>
    </div>
  )
}

export default Dashboard