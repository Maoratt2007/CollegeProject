const http= require('http');
const path = require('path') // creates a path
const express = require('express'); // תקיית express

const port = 90;

const app = express(); // מופע של השרת

app.use(express.json()) // add the option to use json
app.use(express.urlencoded({extended:true})) // add the option to use data from form
app.use(express.static(path.join(__dirname, 'public')))  // express.static means that the app will have permision to access the folder 'public' __dirname is the fodler we were in and when you join __dirname and public it takes you to that path (app)
app.set('view engine', 'ejs')

let index = 0
const movies = [
 
]

// Create
app.post('/save' /* Path name (can be anything) */, (req /* req is where all of the data is stored */, res) => {
    let movie = req.body // the form sends us data and it goes in req.body so we put the data in movie
    movie.id = index++ // movie index, when you want to delete something you'll have to delete it from its index so it doesnt delete many movies with the same name/year/genre
    movies.push(movie) // add the data as a new movie
    res.render("list") // returns data through res.send and makes a back link that makes you return to the main menu
})



// Read
app.get('/movies',(req, res) => {
    res.send(movies) // displays the movies data
});


// Delete STILL IN PROGRESS
app.delete('/delete',(req, res) => {
    const id= req.params.id;
    const movieToDelete= movies.find(el=> el.id===id);
    const index=movies.indexOf(movieToDelete);
    movies.splice(index,1);
    res.send(movies)
});
app.put('/update', (req, res) => {
    myData[req.body.index] = { 
        fname: req.body.firstName,
        lname: req.body.lastName,
        selectOption: req.body.ddlRun
    }
    
    res.end(req.body.index);
});

const server= http.createServer(app, (req,res)=>{ // Creates a server and connects the "app" to it
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write("Hello World");
    res.end();
})



server.listen(port);