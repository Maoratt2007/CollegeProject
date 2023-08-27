const userService = require('../services/userservice')

const register = async(req,res)=>{
    try {
        const token = await userService.register(req.body)
        return res.status(200).json({token})
    } catch(e) {
        return res.status(400).json({errors:[e.message]})
    }
}


const login = async(req,res)=>{
    try {
        const token = await userService.login(req.body)
        return res.status(200).json({token})
    } catch(e) {
        return res.status(400).json({errors:[e.message]})
    }
}


const setPasswordResetFlag = async (req,res) => {
    try {
        await userService.setPasswordResetFlag(req.body.email);
        return res.status(200).json({message:"Successfully set reset flag"})
    } catch(e) {
        return res.status(400).json({errors:[e.message]})
    }

}

const changePassword = async (req,res) => {
    try {
        req.body = JSON.parse(req.body)
        const updatedUser = await userService.changePassword(req.body.email, req.body.newPass);
        return res.status(200).json(updatedUser)
    } catch(e) {
        console.log(e)
        return res.status(400).json({errors:[e.message]})
    }
}


const createUser=async(req,res)=>{
    const new_user= await userService.creatUser(req.body.name,req.body.email,req.body.password,req.body.manager,req.body.passwordResetFlag);
    res.json(new_user);
}

const getUser = async(req,res)=>{

    let user;

         user=await userService.getUsers();
        if(!user)
        {
            return res.status(404).json({errors:['user was not found']})

        }
    
    res.json(user);
}

const findUserById=async(req,res)=>{
    const user= await userService.findUserById(req.params.id);
    if(!user)
    {
         return res.status(404).json({errors:['user was not found']})
    }
    res.json(user);
}

const deleteUser=async(req,res)=>{

    const user= await userService.deleteUser(req.params.id);
    if(!user)
    {
        return res.status(404).json({errors:['user was not found']})
    }
    res.send();
}

const updateUser=async(req,res)=>{

    if(!req.body.name)
    {
        return res.status(400).json({errors:['you dont have name to your user']});
    }

    if(!req.body.email)
    {
        return res.status(400).json({errors:['you dont have email of user']});
    }

    if(!req.body.password)
    {
        return res.status(400).json({errors:['you dont have your password of user']});
    }
    if(!req.body.manager)
    {
        return res.status(400).json({errors:['you dont have your manager of user']});
    }


    const user= await userService.updateUser(req.params.id, req.body.name,req.body.email,req.body.password,req.body.manager,req.body.passwordResetFlag);
    if(!user)
    {
        return res.status(404).json({errors:['user was not found']})
    }
    res.json(user);

}

module.exports={
    createUser,
    getUser,
    findUserById,
    deleteUser,
    updateUser,
    register,
    login,
    setPasswordResetFlag,
    changePassword
}