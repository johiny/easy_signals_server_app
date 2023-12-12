import React from 'react'
import 'styles/dashboard.css'
import Screencard from 'components/Screencard'
import { useState, useEffect } from 'react'
const Dashboard = () => {
  const [activeScreens, setActiveScreens] = useState([]);
  useEffect(() => {
    window.ipcRenderer.send('get_screens');
    window.ipcRenderer.on('screens_change', (e, data) => {
      setActiveScreens(data);
    })
  }, [])
  return (
    <div className='dashboard'>
    <h1>
        Easy Signals
    </h1>
    <div className='screenCards_Container'>
      { activeScreens.length > 0 ? 
      activeScreens.map(screen => (
        <Screencard key={screen} screen_id={screen}/>
      )) : <h1>No hay pantallas conectadas</h1>}
    </div>
    </div>
  )
}

export default Dashboard