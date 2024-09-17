import prisma from "../../db/connectdb.js";
import multer from "multer";
import path from 'path';
import multerData from '../../config/mullter.js'
import 'dotenv/config'


const upload=multer({storage:multerData}).array('mediaFiles',20)

export const addpost=async(req,res)=>{

   upload(req,res, async function(error) {
      if(error){
         console.log(error)
        return res.status(500).json({message:"File upload failed", error:error
        })
      }


      const {content,userid}=req.body;
      const files=req.files;

      if(!content || !userid ||files.length===0){
         return res.status(400).json({message:"content,userid and files are required"})
      }

      try {
          const newPost=await prisma.post.create({
            data:{
                content:content,
                authorId:parseInt(userid),
                media: {
                    create: files.map((file) => ({
                      url: `${process.env.BASE_URL}/media/${file.filename}`, 
                      type: file.mimetype.startsWith('image') ? 'IMAGE' : 'VIDEO', 
                    })),
                  },
                
            },
            include:{
                media:true
            }
          })

          return res.status(201).json({ message: 'Post created successfully', post: newPost });
      } catch (error) {
        console.log(error)
        
      }
    
   })

}

export const getall=async(req, res)=>{

  try {
      const post=await prisma.post.findMany({
        include:{
          author:true,
          media:true
        }
      })


      console.log(post)

      res.status(200).json({message:"here is all post", post:post})
  } catch (error) {
    console.log(error)
    
  }


}