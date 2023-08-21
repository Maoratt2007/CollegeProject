const express=require('express');
const route= express.Router();

route.get('/',(req,res)=>
{
    res.render('historycustomerejs');
})
module.exports=route;