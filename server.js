const path = require('path') // creates a path
const express = require('express'); // תקיית express
const bodyParser = require('body-parser');//get from body the parameters, for example if i type in form "maor", the bodyParser will recive this 'maor'
const mongoose=require('mongoose');//sets off the mongoose
const ProductRoute= require('./routes/productroute');//let you the actions: put delete post get
const UserRoute= require('./routes/userroute');
const BranchRoute= require('./routes/branchroute');
const OrderItemRoute= require('./routes/orderItemroute');
const OrderRoute= require('./routes/orderroute');





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

const app = express(); // מופע של השרת

// app.use(express.json()) // add the option to use json
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





mongodbConnect();

// let index = 0
// const movies = [
 
// ]

// // Create
// app.post('/save' /* Path name (can be anything) */, (req /* req is where all of the data is stored */, res) => {
//     let movie = req.body // the form sends us data and it goes in req.body so we put the data in movie
//     movie.id = index++ // movie index, when you want to delete something you'll have to delete it from its index so it doesnt delete many movies with the same name/year/genre
//     movies.push(movie) // add the data as a new movie
//     res.render("list") // returns data through res.send and makes a back link that makes you return to the main menu
// })



// // Read
// app.get('/movies',(req, res) => {
//     res.send(movies) // displays the movies data
// });


// // Delete STILL IN PROGRESS
// app.delete('/delete',(req, res) => {
//     const id= req.params.id;
//     const movieToDelete= movies.find(el=> el.id===id);
//     const index=movies.indexOf(movieToDelete);
//     movies.splice(index,1);
//     res.send(movies)
// });
// app.put('/update', (req, res) => {
//     myData[req.body.index] = { 
//         fname: req.body.firstName,
//         lname: req.body.lastName,
//         selectOption: req.body.ddlRun
//     }
    
//     res.end(req.body.index);
// });

// const server= http.createServer(app, (req,res)=>{ // Creates a server and connects the "app" to it
//     res.writeHead(200,{"Content-Type":"text/plain"});
//     res.write("Hello World");
//     res.end();
// })

app.listen(port);

//לבדוק איך לחבר בין שתי html בjs
//comment to check
//comment onto abulbul
//comment to SHUTAF