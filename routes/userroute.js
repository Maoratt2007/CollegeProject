const express=require('express');
const router= express.Router();

const UserController= require('../controllers/usercontroller');
const {isAuthenticated} = require('../middleware')
const {sendEmail} = require('../services/emailservice')
router.route('/register')
    .post(UserController.register)

    
router.route('/login')
    .post(UserController.login)

router.route('/')
    .get(isAuthenticated, UserController.getUser)

router.route('/testEmail')
.post(async (req,res) => {
    const { email } = req.body
    try {
        const sent = await sendEmail(email,"Hello world")
        res.send("Email sent.")
    } catch(e) {
        console.log(e)
        res.json({errors: [e.message]})
    }
})

    
router.route('/:id')
    .get(UserController.findUserById)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

module.exports=router;