const express=require('express');
const route= express.Router();

route.get('/',(req,res)=>
{
    res.render('contactejs');
})
module.exports=route;