import express from 'express'
import { addpost, getall } from './post.controller.js'




const route=express.Router()


route.post('/add',addpost)
route.get('/getall',getall)




export default route