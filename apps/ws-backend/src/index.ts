import { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken"
const wss = new WebSocketServer({ port: 8080 });

interface TOKENtype {
  userId : string
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if(!url){
    return
  }
  const AllQueryParam = new URLSearchParams(url.split('?')[1]);
  const token = AllQueryParam.get('token') || "";
  const decoded = jwt.verify(token, "jwtsecret") as TOKENtype

  if(!decoded || !decoded.userId){
    ws.close()
    return
  }
  ws.on('message', function message(data) {
    ws.send('pong');
  });

});