const tmdbOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzIwYjFiNzEzYTZhYTIzNWZmMjQ5ZmM3YzQ1NzNiZiIsInN1YiI6IjY2MzI0Yjk3MDA2YjAxMDEyZDFkMWZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ZidW01P2Y6QUvUgtmUVpvmm2fchAFrVzkFnxC5xPnY'
    }
};
  
  
const btnContainer = document.querySelector('#button-container');
let allGenres = JSON.parse(localStorage.getItem('genresList'));


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
  


function createButton(buttonID, buttonName){
    const newButton = document.createElement('button');
    // Completar Array con estilos
    const bulmaStyles = ['is-link', ]
    // crear funcion para obtener numero aleatorio del length de bulmaStyles
    

    newButton.setAttribute("data-genre", buttonID)
    // asginar bulmaStyles[numerorandom] en vex de isprimary
    newButton.setAttribute('class', "button is-primary m-3" );
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

function createGenreButtons(){
  for(let gen_i of allGenres){
    createButton(gen_i.id, gen_i.name);
  }
};



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

