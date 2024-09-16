import express from 'express'
const route=express.Router()

import userroute from './server/user/user.route.js'
import postRoute from './server/post/post.route.js'




route.use('/user',userroute)
route.use('/post',postRoute)


export default route