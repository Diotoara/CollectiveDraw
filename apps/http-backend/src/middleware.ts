import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"

interface MyToken {
    userId: string;
}

export default function middleware (req:Request,res:Response,next:NextFunction) {
    const token = req.headers["authorization"] || "";

    const decoded = jwt.verify(token, JWT_SECRET) as MyToken ;
    if(decoded){
        req.userId = decoded.userId;
    } else{
        next();
        return res.status(403).json({
            message : "Authentication Error"
        })
    }
    next();
    return;
}