import express from 'express'
import { getall } from '../video/video.controller.js'
const route=express.Router()


route.get('/getall',getall)




export default route