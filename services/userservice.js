

const User = require('../modules/user')
const crypto = require('crypto')
const dotenv= require('dotenv');
const { sign } = require('jsonwebtoken')
dotenv.config();
// 2 key components 
// Encrypted Passwrod 
// JWT authentication
// oh21i43u1ghbdfujsbdif

// Encyrpted Password - > crypto
// JWT - jsonwebtoken


//errors
class UserAlreadyExistsException extends Error {
    constructor(message) {
        super(message)
    }
}
class UserDoesNotExistsException extends Error {
    constructor(message) {
        super(message)
    }
}

class PasswordsDoNotMatchException extends Error {

    constructor(message) {
        super(message)
    }
}

// Register a new user
// Check that it doesnt exist already and create the user if not
// userDetails is of the template of the User model
const register = async (userDetails) => {


    const email = userDetails.email

    const userExists = await User.findOne({email})

    if(userExists) {
        throw new UserAlreadyExistsException("A user with this email already exists")
    }
    const secret = process.env.SECRET_KEY;
    const hashedPassword = crypto.createHmac('sha1', secret)
                   .update(userDetails.password)
                   .digest('hex');
    
    const newUser = await User.create({...userDetails, password:hashedPassword });
    
    const token = sign({user_id:newUser._id},secret, {expiresIn:'3h'})

    
    return token
}


// Creates a new user
// Check that email exists, if it exists do:
// hash the password and check if its same as the hashes password in the database
const login = async (user) => {

    const { email, password } = user;

    const userExists = await User.findOne({email})

    if(!userExists) {
        throw new UserDoesNotExistsException("A user with this email does not exist")
    }

    const secret = process.env.SECRET_KEY;
    const hashedPassword = crypto.createHmac('sha1', secret)
                   .update(userExists.password)
                   .digest('hex');


    if(userExists.password !== password) { // if the password the user entered does not match the one in database
        throw new PasswordsDoNotMatchException("Passwords do not match")
    }        
     
     const token = sign(userExists._id,secret, {expiresIn:'3h'})

     return token
}

//add category for method post
const creatUser=async (name,email, password,manager)=>{
    const user =new User({
        name:name,
        email:email,
        password:password,
        manager:manager,
        order:order
    });
    return await user.save();

}
//find by id 
const findUserById= async(_id)=>{
    return await User.findById(_id);
}
//get all
const getUsers= async()=>{
    return await User.find({});
}
//update
const updateUser=async(_id,name,email, password,manager)=>{
    const user=await findUserById(_id);
    if(!user)
    {
        return null;
    }
    user.name=name;
    user.email=email;
    user.password=password;
    user.manager= manager;
    user.order=order;

    return await user.save();
}
//delete
const deleteUser=async(_id)=>{
    const user=await findUserById(_id);
    if(!user)
    {
        return null;
    }
    return await user.deleteOne();
}

module.exports={
    creatUser,
    findUserById,
    getUsers,
    updateUser,
    deleteUser,
    register, 
    login
}
