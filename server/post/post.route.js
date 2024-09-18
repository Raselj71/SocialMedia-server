import express from 'express'
import { addpost, getall ,getsingle} from './post.controller.js'




const route=express.Router()


route.post('/add',addpost)
route.get('/getall',getall)
route.get('/getsingle/:id',getsingle)




export default route