import prisma from "../../db/connectdb.js";
import bcrypt from "bcrypt";

export const login=async(req,res)=>{

     try {
         const data= req.body;
        


         res.send("you are receiving data")
     } catch (error) {
        
     }

}

export const signup=async(req,res)=>{

  try {
    const {firstName, lastName,email,password,bio,profilePicture}=req.body

     const existuser=await prisma.user.findUnique({
      where:{
        email
      }
     })

     if(existuser){
     return res.status(409) .json({
        data:"user already exist",
        status:409
      })
     }
    const user=await prisma.user.create({
      data:{
         firstName:firstName,
         lastName:lastName,
         email:email,
         password:password,
         bio:bio,
         profilePicture:profilePicture
      }
    })

   
    res.status(201).json({data:user, status:201})
  } catch (error) {
    
  }



}