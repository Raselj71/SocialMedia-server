const express=require('express')
const route=express.Router()

const userroute=require('./server/user/user.route')




route.use('/user',userroute)


module.exports=route