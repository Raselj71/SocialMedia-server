const express=require('express')
const route=require('./route')
const app=express()


app.use('/',route)







module.exports=app

