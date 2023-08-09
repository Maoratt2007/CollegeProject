const express=require('express');
const route= require('Router');

route.get('/',(req,res)=>
{
    res.render('menu');
})