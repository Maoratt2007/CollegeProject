const path = require('path') // creates a path
const express = require('express'); // תקיית express
const bodyParser = require('body-parser');//get from body the parameters, for example if i type in form "maor", the bodyParser will recive this 'maor'
const mongoose=require('mongoose');//sets off the mongoose
const ProductRoute= require('./routes/productroute');//let you the actions: put delete post get
const UserRoute= require('./routes/userroute');
const BranchRoute= require('./routes/branchroute');
const OrderItemRoute= require('./routes/orderItemroute');
const OrderRoute= require('./routes/orderroute');
const MenuRoute=require('./routes/menuroute');
const BranchesRoute=require('./routes/branchesroute');
const AboutRoute=require('./routes/aboutroute');
const ContactRoute=require('./routes/contactroute');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);




const dotenv= require('dotenv');
dotenv.config();

const mongodbConnect = async () => {
    try {
        await mongoose.connect(process.env.uri);
        console.log("connect to db")
    }
    catch(error) {
        console.log("fail to connect to db", error.message)
    }
}

const port = 3000;

app.use(express.json()) // add the option to use json
app.use(express.urlencoded({extended:true})) // add the option to use data from form
app.use(express.static(path.join(__dirname, 'public')))  // express.static means that the app will have permision to access the folder 'public' __dirname is the fodler we were in and when you join __dirname and public it takes you to that path (app)
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('Views'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/api/products', ProductRoute);
app.use('/api/user', UserRoute);
app.use('/api/branch', BranchRoute);
app.use('/api/orderitem',OrderItemRoute );
app.use('/api/order', OrderRoute);
app.use('/menu', MenuRoute);
app.use('/branch', BranchesRoute);
app.use('/about', AboutRoute);
app.use('/contact', ContactRoute);


mongodbConnect();

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " has joined the Chatroom");
    });
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " has left the Chatroom");
    });
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
})

// server.listen(port);
app.listen(port);
