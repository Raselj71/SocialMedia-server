import express from 'express'
import { login, signup } from './user.controller.js'



const route=express.Router()


route.post('/login',login)
route.post('/signup',signup)



export default route