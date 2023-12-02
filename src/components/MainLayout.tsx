import 'animate.css';
import './mainLayout.css'
import { ReactNode } from 'react';
const MainLayout = ({children} : {children : ReactNode}) => {
  return (
    <div className='mainLayout'>
        {children}
    </div>
  )
}

export default MainLayout