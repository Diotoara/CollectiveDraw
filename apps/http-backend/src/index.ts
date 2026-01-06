import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import middleware from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import {CreateUserSchema} from "@repo/common/types"

const app = express();

app.use(express.json())

app.post('/signup', (req,res)=>{

    const data = CreateUserSchema.safeParse(req.body());
    if(!data.success){
        return res.json({
            message:"Incorrect Input"
        })
    }

})

app.post('/signin', (req,res)=>{
    const {username, password} = req.body();

    const userId=1;
    const token = jwt.sign({userId}, JWT_SECRET)

})

app.post("/room", middleware , (req,res)=>{

    //db call

    res.json({
        roomid : 12
    })

})

app.listen(3000)