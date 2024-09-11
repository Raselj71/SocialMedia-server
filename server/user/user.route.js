const express =require('express')

const route=express.Router()


route.get('/all',(req, res)=>{

    res.json({data:"all user are ok"})
})



module.exports=route