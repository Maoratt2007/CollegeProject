const movieTableBody = document.getElementById('movie-table-body')
const movieTable = document.getElementById('movie-table')


function createMovieRow(movie) {
    return `
     <tr> 
                <td>${movie.name}</td>
                <td>${movie.genre} </td>
                <td>${movie.releaseDate} </td>
                <form  href="/">
                  <td> <button type="submit" id="delete" onclick="update_movie()" > update</button><td>
               </form>

    </tr>
    `
}

// GET,POST,DELETE,PUT

// function deleteMovie(id) {
//     // DELETE request
// fetch(`/movies-delete/${id}`, { method:'DELETE' }) // Request to server /movies path to get the movies array
// .then((res) => {
//     return res.json() // convert raw-data to json  
// }).then(movies => {
    
//     if(movies.length < 1) {
//         return;
//     }
//     // remove all movies from table
//     movieTable.innerHTML = ''
//     movieTable.style.display = 'inherit'
//     // re-populate movie table after deletion
//     for(let movie of movies) {
//         // movie : {name,genre,releaseYear}
//         movieTableBody.innerHTML += createMovieRow(movie)
//     }

//     // Do something with movies (Show in html)
// })
// }

// GET request
fetch('/movies', { method:'GET'}) // fetch makes it so you can communicate with the server, so when you type /movies it goes to its path and it gets the movies array (method is optional but its recommended)
.then((res) => { // only when 'res' has any kind of data in it this function will work, otherwise it won't
    return res.json() // convert raw-data (binary data) to json  
}).then(movies => { // when you finally got the movies you can do whatever you want with them, in this case we run some tests and create a table with it
    
    if(movies.length < 1) {
        return;
    }
    movieTable.style.display = 'inherit' //  'inherit' means that the display goes back to what it was (grid,flex..)
    for(let movie of movies) {
        // movie : {name,genre,releaseYear}
        movieTableBody.innerHTML += createMovieRow(movie)
    }

    // Do something with movies (Show in html)
})
function delete_movie()
{
    fetch('/delete', { method:'DELETE'})
.then((res)=>{
    return res.json();
}).then(movies=>{
    movieTableBody.innerHTML='';
    if(movies.length < 1) {
        return;
    }
    for(let movie of movies) {
        // movie : {name,genre,releaseYear}
        movieTableBody.innerHTML += createMovieRow(movie)
    }

})

}
function update_movie()
{
    fetch('/update', { method:'PUT'})
.then((res)=>{
    return res.json();
}).then(movies=>{
    movieTableBody.innerHTML='';
    if(movies.length < 1) {
        return;
    }
    for(let movie of movies) {
        // movie : {name,genre,releaseYear}
        movieTableBody.innerHTML += createMovieRow(movie)
    }

})

}

    




// TODO : Update,Delete