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
    <h1>
        Easy Signals<br/>
        <span>Your Server IP is : {hostIP}</span>
    </h1>
    <div className='screenCards_Container'>
      { activeScreens.length > 0 ? 
      activeScreens.map((screen, index) => (
        <Screencard key={screen} screen_id={screen} index={index}/>
      )) : <h1>No hay pantallas conectadas</h1>}
      <Screencard key={screen} screen_id={'asdasdasd'} index={1}/>
    </div>
    </div>
    </div>
  )
}

export default Dashboard