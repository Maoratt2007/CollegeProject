
const userService = require('../services/userservice')

const register = async(req,res)=>{
    try {
        await userService.register(req.body)
        return res.status(200).json()
    } catch(e) {
        console.log(e)
        return res.status(400).json({errors: e.message})
    }
}


const login = async(req,res)=>{
    try {
        const {userId, manager} = await userService.login(req.body)
        return res.status(200).json({userId, manager})
    } catch(e) {
        return res.status(400).json({errors: e.message})
    }
}



const createUser=async(req,res)=>{
    const new_user= await userService.creatUser(req.body.name,req.body.email,req.body.password,req.body.manager);
    res.json(new_user);
}

const getUsers=async(req,res)=>{
    let user;
    if((req.query.email)&&(req.query.name))
    {
      user=await userService.getUsernem(req.query.name, req.query.email, req.query.manager)
      if(user.length==0)
      {
        return res.status(404).json({errorsuser:['user query was not found']})
      }
    }
    else
    {
        user= await userService.getUsers();
        if(!user)
        {
            res.status(404).json({errors:['user was not found']})
    
        }

    }


    res.json(user);   
}

const findUserById=async(req,res)=>{
    const user= await userService.findUserById(req.params.id);
    if(!user)
    {
         res.status(404).json({errors:['user was not found']})
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
        res.status(400).json({errors:['you dont have name to your user']});
    }

    if(!req.body.email)
    {
        res.status(400).json({errors:['you dont have email of user']});
    }

    if(!req.body.password)
    {
        res.status(400).json({errors:['you dont have your password of user']});
    }
    if(!req.body.manager)
    {
        res.status(400).json({errors:['you dont have your manager of user']});
    }


    const user= await userService.updateUser(req.params.id, req.body.name,req.body.email,req.body.password,req.body.manager);
    if(!user)
    {
        return res.status(404).json({errors:['user was not found']})
    }
    res.json(user);

}

module.exports={
    createUser,
    getUsers,
    findUserById,
    deleteUser,
    updateUser,
    register,
    login

}


