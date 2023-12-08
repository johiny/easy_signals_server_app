
import {networkInterfaces} from 'os';

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

export { obtenerIP }