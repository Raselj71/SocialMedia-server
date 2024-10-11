import prisma from "../../db/connectdb.js";
import multer from "multer";


import 'dotenv/config'
import {uploadImage} from "../../cloudinarySetup.js";
import mullter from "../../config/mullter.js";




export const addpost=async(req,res)=>{
   try {
    mullter(req,res, async function(error) {
      if(error){
         console.log(error)
        return res.status(500).json({message:"File upload failed", error:error
        })
      }


      const {content,userid}=req.body;
      const files=req.files;
     
     

    

      if(files.length===0){

         const newPost= await prisma.post.create({
           data:{
            content:content,
            authorId:parseInt(userid)
           }
         })

         return res.status(201).json({ message: 'Post created successfully', post: newPost });



      }else{
           
        const resultArray = await Promise.all(files.map(async (file) => {
          const imageStream = file.buffer;
          const imageName = file.originalname + new Date().getTime().toString();
          const result = await uploadImage(imageStream, imageName);

          return {
            url: result.secure_url,
            type: file.mimetype.startsWith('image') ? 'IMAGE' : 'VIDEO',
          };
        }));

      
             
        

        const newPost=await prisma.post.create({
          data:{
              content:content,
              authorId:parseInt(userid),
               media: {
                create: resultArray.map((file) => ({
                  url: file.url,
                  type: file.type
                })),
                },
              
          },
          include:{
              media:true
          }
        })

        return res.status(201).json({ message: 'Post created successfully', post: newPost });
      }

    
    
   })

   } catch (error) {
    console.log(error)
    
   }
  
}

export const getall=async(req, res)=>{

  try {
      const post=await prisma.post.findMany({
        include:{
          author:true,
          media:true,
          comment:true
        }
      })


      console.log(post)

      res.status(200).json({message:"here is all post", post:post})
  } catch (error) {
    console.log(error)
    
  }


}

export const getsingle=async(req, res)=>{
     const post =await prisma.post.findUnique({
      where:{
        id:req.params.id
      }
     })
     res.status(200).json({message:"this is single post route"})
}