import express from 'express'
import { addpost, getall ,getsingle, addcomment,addlike} from './post.controller.js'




const route=express.Router()


route.post('/add',addpost)
route.get('/getall',getall)
route.get('/getsingle/:id',getsingle)
route.post('/addcomment',addcomment)
route.post('/like',addlike)




export default route