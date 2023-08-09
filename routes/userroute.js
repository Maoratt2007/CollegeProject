const express=require('express');
const router= express.Router();

const UserController= require('../controllers/usercontroller');


router.route('/register')
    .post(UserController.register)

    
router.route('/login')
    .post(UserController.login)

router.route('/')
    .get(UserController.getUsers)
    .post(UserController.createUser)

    
router.route('/:id')
    .get(UserController.findUserById)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

module.exports=router;