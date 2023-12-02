import { useState, useEffect } from "react"
import MainLayout from './MainLayout'
import Arrow from './Arrow'
import Loader from "./Loader"
const screens = [Screen1, Screen2, Screen3]
const finalScreen = 2
const BeginSlider = () => {
    const [index, setIndex] = useState(0)
    const [screen, setScreen] = useState(screens[0])
    useEffect(() => {
        setScreen(screens[index])
        if(index === finalScreen){
            window.ipcRenderer.send('go-to-directus')
        }
    },[index])
    const handleScreen = () => {
        setIndex((prev) => prev + 1)
    }
  return (
    <MainLayout>
        {screen}
    { index < 2 && <Arrow action={handleScreen}/>}
    </MainLayout>
  )
}

function Screen1(){
    return(
        <>
            <h1 className='animate__animated animate__fadeInDown'>Bienvenido a Easy Signals</h1>
            <p className="read-the-docs animate__animated animate__fadeInDown">
                 Click para continuar la Configuracion
            </p>
      </>
    )
}

function Screen2(){
    return(
        <>
            <h2 className='animate__animated animate__fadeInDown'>Easy Signals te ayuda a controlar tu contenido y mostrarlo en las pantallas que desees</h2>
            <p className="read-the-docs animate__animated animate__fadeInDown">
                 Click para continuar la Configuracion
            </p>
      </>
    )
}

function Screen3(){
    return(
        <>
            <h1 className='animate__animated animate__fadeInUp'>Espera un momento mientras configuramos todo</h1>
            <Loader/>
      </>
    )
}



export default BeginSlider