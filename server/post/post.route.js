import express from 'express'
import { addpost } from './post.controller.js'




const route=express.Router()


route.post('/add',addpost)




export default route