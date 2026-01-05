import express from "express";
import jwt from "jsonwebtoken"
import middleware from "./middleware";

const app = express();

app.use(express.json())

app.post('/signup', (req,res)=>{
    const {username, password} = req.body();

})

app.post('/signin', (req,res)=>{
    const {username, password} = req.body();

    const userId=1;
    const token = jwt.sign({userId}, "jwtsecret")

})

app.post("/room", middleware , (req,res)=>{

    //db call

    res.json({
        roomid : 12
    })

})

app.listen(3000)