

//hiiiiiiiiiiiiiiiiiiiiiiiiiiii
const userService = require('../services/userservice')

const register = async(req,res)=>{
    try {
        const token = await userService.register(req.body)
        return res.status(200).json({token})
    } catch(e) {
        console.log(e)
        return res.status(400).json({errors:[e.message]})
    }
}


const login = async(req,res)=>{
    try {
        const token = await userService.login(req.body)
        return res.status(200).json({token})
    } catch(e) {
        return res.status(400).json({errors:[e]})
    }
}


module.exports = {register,login}