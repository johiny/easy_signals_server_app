import express from 'express';
import {obtenerIP} from './utils/os';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
const port = 3000;
const activeScreens = []
const StartServer = () => {
// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
app.use(cors());

// Configuración para escuchar en todas las interfaces de red
const express_server = app.listen(port, () => {
  const host = obtenerIP()
  console.log(`Servidor escuchando en http://${host}:${port}`);
});


const io = new Server(express_server, {
  cors: {
    origin: '*',
  
}})
io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);
  activeScreens.push(socket.id)
});

}

export default StartServer;