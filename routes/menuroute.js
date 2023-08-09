const express=require('express');
const route= express.Router();

route.get('/order',(req,res)=>
{
    res.render('menuejs');
})
module.exports=route;