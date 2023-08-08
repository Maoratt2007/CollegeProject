const express=require('express');
const router= express.Router();

const UserController= require('../controllers/usercontroller');


router.route('/register')
    .post(UserController.register)

    
router.route('/login')
    .post(UserController.login)

module.exports=router;