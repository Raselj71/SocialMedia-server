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


      const {content,userId}=req.body;
     
      const files=req.files;
     
     

    

      if(files.length===0){

         const newPost= await prisma.post.create({
           data:{
            content:content,
            userId:parseInt(userId)
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
               userId:parseInt(userId),
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
        orderBy:{
           createdAt:'desc'
        },
        include:{
          user:{
             select:{
              id:true,
              firstName:true,
              lastName:true

             }
          },
          media:true,
          comment: {
            include: {
              user: {  
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
              replies: { 
                include: {
                  user: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
            },
          },
          
          likes:true,
          
        },
      
        
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

export const addcomment=async(req, res)=>{

    try {
         const{postId,authorId,content,parentId}=req.body
         if (!content || !postId || !authorId) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

         const comment=await prisma.comment.create({
          data:{
            content,
            postId:parseInt(postId),
            userId:parseInt(authorId),
            parentId: parentId ? parseInt(parentId) : null

          },
         
         })

         res.status(201).json(comment);


     

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the comment' });
      
    }

}

export const addlike=async(req, res)=>{

      try {
            const{postId,userId}=req.body

            const existingLike=await prisma.like.findFirst({
              where:{
                postId:parseInt(postId),
                userId:parseInt(userId)
              }
            })

            if(existingLike){
                 await prisma.like.delete({
                   where:{
                    id:existingLike.id
                   }
                 })

                 res.status(200).json({ message: 'Like removed' });

            }else{
              const newLike = await prisma.like.create({
                data: {
                  postId: parseInt(postId),
                  userId: parseInt(userId),
                },
              });
              res.status(201).json({ message: 'Post liked', like: newLike });

            }

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error handling like' });
      }


}