import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import middleware from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import {CreateUserSchema} from "@repo/common/types"
import {prisma} from "@repo/db"

const app = express();

app.use(express.json())

app.post('/signup', async (req,res)=>{

    const info = CreateUserSchema.safeParse(req.body);
    if(!info.success){
        return res.json({
            message:"Incorrect Input"
        })
    }

    try {
        await prisma.user.create({
            data:{
                email:info.data.username,
                Passsword:info.data.password,
                name:info.data.name
            }
        })
        console.log("added to db.")
        res.json({
            message : "user added to database."
        }) 
    } catch (error) {
        res.status(411).json({
            message:"User might already exist. Try Again"
        })
    }
    
})

app.post('/signin', (req,res)=>{
    const {username, password} = req.body;

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