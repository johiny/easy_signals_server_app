
import {networkInterfaces} from 'os';
import { readFileSync } from 'fs';
const obtenerIP = () => {
    const interfaces = networkInterfaces();
    let direccionIP = '';
  
    // Recorre todas las interfaces de red
    for (const [key, value] of Object.entries(interfaces)) {
      for (const interfaz of value) {
        // Filtra las direcciones IPv4 no internas (ej. 127.0.0.1)
        if (!interfaz.internal && interfaz.family === 'IPv4') {
          direccionIP = interfaz.address;
        }
      }
    }
  
    return direccionIP;
};

const convertToBase64 = (image_route) => {
  const image = readFileSync(image_route, 'base64');
  return image
}

export { obtenerIP, convertToBase64 }