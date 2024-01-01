import express from 'express';
import {obtenerIP} from './utils/os';
import { Server } from 'socket.io';
import cors from 'cors';
import easySignalScreens from '../../electron/screens_store';
import { existsSync } from 'fs';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import https from 'https';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fs from 'fs';

const app = express();
const port = 3000;
const activeScreens = []

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const options = {
//   key:  fs.readFileSync('./src/api/server.key', 'utf-8'),
//   cert: fs.readFileSync('./src/api/server.cert', 'utf-8')
// };

const StartServer = () => {
// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
app.use(cors());
// dev route
const public_route = '../src/player/dist'
// // deploy route
// const public_route = '../player'
app.use('/', express.static(path.join(__dirname, public_route)));
// Ruta para obtener archivos
app.get('/currentfile/:screen_id/:filename', (req, res) => {
  const screen_id = req.params.screen_id
  try{
    console.log('peticion entrante' , screen_id)
    if(existsSync(easySignalScreens[screen_id]?.filepath)){
      res.header('Content-Type', easySignalScreens[screen_id].filetype);
  
      // Envía el archivo de video
      res.sendFile(easySignalScreens[screen_id]?.filepath);
    }
  }
  catch(e){
    console.log(e)
  }
})

app.get('/health', (req, res) => {
  res.send('Server Alcanzado y funcionando')
})

// ruta para obtener el reproductor
app.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, public_route, "index.html"));
})

// Configuración para escuchar en todas las interfaces de red
//express http server
const express_server = app.listen(port, '0.0.0.0', () => {
  const host = obtenerIP()
  console.log(`Servidor escuchando en http://${host}:${port}`);
});
// express server https
// const express_server = https.createServer(options, app).listen(port, '0.0.0.0', () => {
//   const host = obtenerIP()
//   console.log(`Servidor escuchando en http://${host}:${port}`);
// });
const io = new Server(express_server, {
  cors: {
    origin: '*',
}})

return {io ,activeScreens}
}

export default StartServer;