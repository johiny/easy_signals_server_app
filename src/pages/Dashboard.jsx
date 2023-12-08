import React from 'react'
import 'styles/dashboard.css'
import Screencard from 'components/Screencard'
const Dashboard = () => {
  return (
    <div className='dashboard'>
    <h1>
        Easy Signals
    </h1>
    <div className='screenCards_Container'>
      <Screencard/>
    </div>
    </div>
  )
}

export default Dashboard