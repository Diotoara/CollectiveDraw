import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../config";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws =  new WebSocket(`${WEBSOCKET_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjOGY4NThiOS00NzkzLTQxY2MtOWYzMS1lMmQyOGU2OGNjMWYiLCJpYXQiOjE3NjgyODQyMjl9.4vGp_fuKk0oCJ5QHKbcXc42IsfnMRr-6oxOic9ygWvs`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws)
        }
    },[]);

    return{
        socket,
        loading
    }
}