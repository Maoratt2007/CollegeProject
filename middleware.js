const dotenv= require('dotenv');
const { decode } = require('jsonwebtoken')
dotenv.config();

const isAuthenticated = async (req, res, next) => {

    try {
        const tokenHeader = req.headers['authorization'] ?? req.headers['Authorization'] //  'Bearer n23io1;r5huidsbgiudshguidshgu'
        if(!tokenHeader) {
            return next("Unauthorized request")
        }

        // take the token part out of the header string
        const token = tokenHeader.split('Bearer ')[1]


        const { user_id } = decode(token) // {user_id :"lk21n4lk12nl4k1n", iat:12341232134}
        req.user_id = user_id // save the user id in the request object for later use
        next()
    } catch(e) { // if any errors occured, redirect the request to error route
        next(e.message)
    }
    
}

module.exports = { isAuthenticated }

//HA