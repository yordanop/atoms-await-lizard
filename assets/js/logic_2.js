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

  function getRandomWow(wowContainer){

    const apiUrl = `https://owen-wilson-wow-api.onrender.com/wows/random`;

    fetch(apiUrl, owenWilsonOptions)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            wowContainer.src = `${data[0].audio}`;
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert('Unable to connect Owen Wilson WOWs');
    });
}

function generateMovieCards(movieInfo){
    const posterPath = String(movieInfo.poster_path).slice(1);
    const movieName = movieInfo.title;

    const magicSound = document.createElement('audio');
    getRandomWow(magicSound);

    const cellContainer = document.createElement('div');
    cellContainer.setAttribute('class', 'cell is-clickable');

    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'card m-3');

    const cardContentContainer = document.createElement('div');
    cardContentContainer.setAttribute('class', 'card-content moviePoster p-0');

    const figureContainer = document.createElement('figure');
    figureContainer.setAttribute('class', 'card-image');

    const imgContainer = document.createElement('img');
    imgContainer.setAttribute('src', `http://image.tmdb.org/t/p/w342/${posterPath}`);
    imgContainer.setAttribute('alt', `Movie poster of ${movieName}`);

    const overlayDivContainer = document.createElement('div');
    overlayDivContainer.setAttribute('class', 'is-overlay is-flex is-flex-direction-column-reverse');

    const textContainer = document.createElement('p');
    textContainer.setAttribute('class', 'title is-4 py-4 pl-3 movie-title');
    textContainer.innerHTML = movieName;


    const movieGenreIds = movieInfo.genre_ids;

    
    cellContainer.appendChild(magicSound);
    cellContainer.appendChild(cardContainer);

    cardContainer.appendChild(cardContentContainer);

    cardContentContainer.appendChild(figureContainer);

    for (let gnr_i = 0 ; gnr_i <= Math.min(1, movieGenreIds.length); gnr_i++){
        let genreName = genresDict.find(item => item.id === movieGenreIds[gnr_i]).name;
        let textFooterContainer = document.createElement('p');
        textFooterContainer.setAttribute('class', 'subtitle button p-2 m-3');   
        textFooterContainer.innerHTML = genreName;
        cardContentContainer.appendChild(textFooterContainer);
    }
    
    figureContainer.appendChild(overlayDivContainer);
    figureContainer.appendChild(imgContainer);

    overlayDivContainer.appendChild(textContainer);

    movieCardsContainer.appendChild(cellContainer);

    cellContainer.addEventListener('click', function(){
        magicSound.play();
    });
}




const movieCardsContainer = document.querySelector('#main-movie-container');
const inputGenre = 28;
const genresDict = JSON.parse(localStorage.getItem('genresList'));
const backButton = document.querySelector('#return-button');

let genreName = genresDict.find(item => item.id === inputGenre).name;

getAndSaveGenreMoviesList(inputGenre)
.then(function(moviesList) {
    localStorage.setItem('moviesGenreList', JSON.stringify(moviesList));
})


backButton.addEventListener('click', function(){
    location.href = './home.html'
});



// adaptar y poner en una funcion las siguientes lineas
const moviesGenreArray = JSON.parse(localStorage.getItem('moviesGenreList'));
for (let movies_i of moviesGenreArray){
    generateMovieCards(movies_i);
}

