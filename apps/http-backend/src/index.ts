import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import middleware from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import {CreateRoomSchema, CreateUserSchema, SignInSchema} from "@repo/common/types"
import {prisma} from "@repo/db"

const app = express();
app.use(express.json())



app.post('/signup', async (req,res)=>{
// username,password,name 
    const info = CreateUserSchema.safeParse(req.body);
    if(!info.success){
        return res.json({
            message:"Incorrect Input"
        })
    }

    try {
        const user = await prisma.user.create({
            data:{
                email:info.data.username,
                //hash password
                Passsword:info.data.password,
                name:info.data.name
            }
        })
        return res.json({
            message : "user added to database.",
            id : user.id
        }) 
    } catch (error) {
        return res.status(411).json({
            message:"User might already exist. Try Again"
        })
    }
    
})

app.post('/signin', async(req,res)=>{
    // username, password 
    const info = SignInSchema.safeParse(req.body);
    if(!info.success){
        return res.json({
            message:"Incorrect Input"
        })
    }

    const user = await prisma.user.findFirst({
        where:{
            email:info.data.username,
            Passsword:info.data.password
        }
    })
    if(!user){
        return res.status(403).json({
            message:"no such user exists"
        })
    }

    const userId = user.id
    const token = jwt.sign({userId}, JWT_SECRET)
    return res.status(201).json({
        token
    })

})

app.post("/room", middleware , async(req,res)=>{
    const userId = req.userId;
    try {
        const info = CreateRoomSchema.safeParse(req.body);
        if(!info.success){
            return res.json({
                message : "Incorrect Inputs"
            })
        }
        
        const room = await prisma.room.create({
            data:{
                slug:info.data.name,
                adminId:userId || ""
            }
        })
         
        return res.json({
            roomid : room.id
        })
    } catch (error) {
        return res.status(411).json({
            message : "Room already exists with this name"
        })
    }  
})

app.get("/chats/:roomId", async (req,res) =>{
    try {
        const roomId = Number(req.params.roomId);
        const messages = await prisma.chat.findMany({
            where:{
                roomId:roomId,
            },
            orderBy:{
                id:"desc"
            },
            take:50
        });
        res.json({
            messages
        })  
    } catch (error) {
        console.log("getting chats error")
    }
    

} )

app.get("/room/:slug", async (req,res) =>{
    const slug = req.params.slug;
    const room = await prisma.room.findFirst({
        where:{
            slug
        },
    });
    res.json({
        room
    })

} )


app.listen(3001, () => {
  console.log("http-backend running on http://localhost:3001");
});
