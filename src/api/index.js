import express from 'express';
import {obtenerIP} from './utils/os';
import { Server } from 'socket.io';
import cors from 'cors';
import easySignalScreens from '../../electron/screens_store';
import { existsSync } from 'fs';

const app = express();
const port = 3000;
const activeScreens = []
const StartServer = () => {
// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
app.use(cors());

// custom routes

app.get('/currentfile/:screen_id/:filename', (req, res) => {
  const screen_id = req.params.screen_id
  try{
    console.log('peticion entrante' , screen_id)
   console.log(easySignalScreens)
    if(existsSync(easySignalScreens[screen_id].filepath)){
      res.header('Content-Type', easySignalScreens[screen_id].filetype);
  
      // Envía el archivo de video
      console.log('archivo enviado', easySignalScreens[screen_id].name)
      res.sendFile(easySignalScreens[screen_id].filepath);
    }
  }
  catch(e){
    console.log(e)
  }
})

// Configuración para escuchar en todas las interfaces de red
const express_server = app.listen(port, '0.0.0.0', () => {
  const host = obtenerIP()
  console.log(`Servidor escuchando en http://${host}:${port}`);
});


const io = new Server(express_server, {
  cors: {
    origin: '*',
  
}})

return {io ,activeScreens}
}

export default StartServer;