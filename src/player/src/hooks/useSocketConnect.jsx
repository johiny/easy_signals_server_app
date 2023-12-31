import { useState, useEffect } from "react";
import createSocket from "../services/backend_connection";

const useSocketConnect = (ip) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [file, setFile] = useState(null);
    const [screenId, setScreenID] = useState(null);
    const [socket, setSocket] = useState(null);
    const handleConnect = () => {
        setLoading(true)
        try{
        const newSocket = createSocket(ip);
        console.log(socket)
        if(newSocket.connected){
            console.log("error intentando rear el socket")
            return {loading, setLoading, error, file, screenId, socket}
        }
        setSocket(newSocket)
        setLoading(false)
        newSocket.on('connect', () => {
          setScreenID(newSocket.id);
        }
        )
        newSocket.on('connect_error', (reason) => {
          console.log(`ip a la cual se intento conectar ${ip} error: ${JSON.stringify(reason)}`)
          setError("error conectando al server local");
        }
        )
        newSocket.on('file_change', (file) => {
            setLoading(true);
            setFile(file);
        })
      }
        catch(e){
          console.log(e)
          setLoading(false)
        }
      };
      useEffect(() => {
        handleConnect()
      },[])
      return {loading, setLoading, error, file, screenId, socket}
}

export default useSocketConnect