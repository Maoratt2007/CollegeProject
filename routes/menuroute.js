const express=require('express');
const route= express.Router();

route.get('/',(req,res)=>
{
    res.render('menuejs');
})
module.exports=route;