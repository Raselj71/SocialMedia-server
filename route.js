import express from 'express'
const route=express.Router()

import userroute from './server/user/user.route.js'




route.use('/user',userroute)


export default route