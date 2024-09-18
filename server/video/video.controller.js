import prisma from "../../db/connectdb.js";

export const getall=async(req, res)=>{
     const video=await prisma.media.findMany({
       where:{
        type:"VIDEO"
       }
     })

    res.status(200).json({message:"this is for test", video:video})
}