const express=require('express');
const route= express.Router();

route.get('/',(req,res)=>
{
    res.render('aboutejs');
})
module.exports=route;