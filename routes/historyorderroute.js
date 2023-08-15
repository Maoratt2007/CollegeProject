const express=require('express');
const route= express.Router();

route.get('/',(req,res)=>
{
    res.render('historyorderejs');
})
module.exports=route;