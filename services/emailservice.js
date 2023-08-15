

const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const sendEmail = async (recepient, message) => {
   const serviceId =  process.env.EMAILJS_SERVICE_ID

   const emailObject = {
        template_id:"template_ll7ewza",
        template_params :{
            message,                   
            to_email: recepient,
            from_name: "10Free",
            pass_reset:`http://localhost:3000/user/resetpass?email=${recepient}`,
        },
        "user_id":process.env.EMAILJS_PUBLIC_KEY,
        accessToken:process.env.EMAILJS_PRIVATE_KEY,
   }

   return await axios.default.post('https://api.emailjs.com/api/v1.0/email/send', emailObject, { headers:{ "Content-Type": "application/json"} })
}

module.exports = {
    sendEmail
}