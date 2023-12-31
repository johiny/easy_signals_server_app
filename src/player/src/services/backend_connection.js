import { io } from "socket.io-client";
    const createSocket = (ip) =>{
        try{
        const ENDPOINT = `http://${ip}:3000`
        const socket =  io(ENDPOINT, {
            secure: true,
             rejectUnauthorized: false
            })
        return socket
        }
        catch(e){
            console.log("error terrible conectando", e)
        }
    
    }


export default createSocket;
