

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

class PasswordResetUnAuthorizedException extends Error {
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
                   .update(password)
                   .digest('hex');


    if(userExists.password !== hashedPassword) { // if the password the user entered does not match the one in database
        throw new PasswordsDoNotMatchException("Passwords do not match")
    }        
     
     const token = sign({user_id:userExists._id}, secret, {expiresIn:'3h'})

     return token
}



const setPasswordResetFlag = async (email) => {
    const user = await User.findOne({email})
    user.passwordResetFlag = true
    await user.save()
}

const changePassword = async (email, newPassword) => {
    const user = await User.findOne({email:email.trim()})
    if(!user.passwordResetFlag) 
        throw new PasswordResetUnAuthorizedException()
    const secret = process.env.SECRET_KEY;
    const hashedPassword = crypto.createHmac('sha1', secret)
                   .update(newPassword)
                   .digest('hex');

    user.password = hashedPassword
     return await user.save()


}

//find by id 
const findUserById= async(_id)=>{
    return await User.findById(_id);
}
//get all
const getUser= async (id)=>{
    return await User.findById(id);
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
    findUserById,
    getUser,
    updateUser,
    deleteUser,
    register, 
    login,
    setPasswordResetFlag,
    changePassword
}
