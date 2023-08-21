const express=require('express');
const route= express.Router();

route.get('/',(req,res)=>
{
    res.render('menumanagerejs');
})
module.exports=route;