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
    .get(UserController.getUser)
    .post(UserController.createUser)

router.route('/reset-pass-request')
    .post(UserController.setPasswordResetFlag)
  
    
router.route('/reset-pass')
    .post(UserController.changePassword)


router.route('/reset-pass-form/:email')
.get((req,res)=>
{
    const email = req.params.email
    res.render('reset_pass',{email});
})   

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