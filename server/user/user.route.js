import express from 'express'
import { login, signup,logininfo } from './user.controller.js'



const route=express.Router()


route.post('/login',login)
route.post('/signup',signup)
route.get('/logininfo/:id',logininfo)



export default route