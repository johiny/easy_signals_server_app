import Loader from "./components/Loader";
import Player from "./components/Player";
import { useState } from "react";
import useSocketConnect from "./hooks/useSocketConnect";
import './App.css'
const App = () => {
    const [ip, setIp] = useState(new URL(window.location.origin).hostname);
    const {loading, setLoading, file, screenId, socket} = useSocketConnect(ip)
    return (
      <div className="mainContainer">
      { loading && <Loader/> }
      {socket?.connected ? <Player file={file} screen_id={screenId} ip={ip} setLoading={setLoading}/> :
      <div>
        <h1>There is a problem<br/> 
        please refresh or call support<br/>
        </h1>
      </div>
      }
      </div>
    )
}
export default App