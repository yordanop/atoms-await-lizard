const tmdbOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzIwYjFiNzEzYTZhYTIzNWZmMjQ5ZmM3YzQ1NzNiZiIsInN1YiI6IjY2MzI0Yjk3MDA2YjAxMDEyZDFkMWZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ZidW01P2Y6QUvUgtmUVpvmm2fchAFrVzkFnxC5xPnY'
    }
};
  
  

const btnContainer = document.querySelector('#button-container');
let allGenres = JSON.parse(localStorage.getItem('genresList'));


// This function generates a list of genres pulled from the API themoviedb 

function getGenresList(){
    const apiUrl = `https://api.themoviedb.org/3/genre/movie/list`;
    return fetch(apiUrl, tmdbOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
          return data.genres;
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert('Unable to connect TMDB');
    });
}


//Fuction makes an API fetch and pulls a list of the genre chosen by the user
function getAndSaveGenreMoviesList(genreID){

    const apiUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreID}`;
  
    return fetch(apiUrl, tmdbOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
        return data.results;
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert('Unable to connect TMDB');
    });
}


// This fuction creates a button for every genre pulled from the API. Also, it gives the buttons a random color each time the page reloads 

function createButton(buttonID, buttonName){
    const newButton = document.createElement('button');
    const bulmaStyles = ['is-link', 'is-success', 'is-warning', 'is-danger']
    const mathRandom = Math.floor(Math.random() * bulmaStyles.length);
    console.log('color random', mathRandom);    
    
    newButton.setAttribute("data-genre", buttonID)
    newButton.className=`button ${bulmaStyles[mathRandom]} m-3`;
    newButton.innerHTML= buttonName;
    btnContainer.appendChild(newButton);

    newButton.addEventListener('click', function(event){
        const genreFromButton = event.target.getAttribute('data-genre');
        getAndSaveGenreMoviesList(genreFromButton)
        .then(function(moviesList) {
            localStorage.setItem('moviesGenreList', JSON.stringify(moviesList));
        })


        setTimeout(() => {
          location.href = "./Movie_Cards.html";
        }, "1500");

        
    });
}

// Each created button will have an specific ID so we can identify them and name them 
function createGenreButtons(){
  for(let gen_i of allGenres){
    createButton(gen_i.id, gen_i.name);
  }
};


//
document.addEventListener("DOMContentLoaded", function(event) {  

  if (!allGenres){
    getGenresList()
    .then(function(genres) {
      allGenres = genres;
      localStorage.setItem('genresList', JSON.stringify(genres));
      setTimeout(createGenreButtons, "2000");

    });

  }else{
    createGenreButtons();
  }

});

