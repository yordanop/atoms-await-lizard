let moviesGenreArray = JSON.parse(localStorage.getItem('moviesGenreList'));

const backButton = document.querySelector('#return-button');

const owenWilsonOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

// function that makes a fetch to an API that returns random audio files with wow from Owen wilson
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


// function that creates thae cards with movie info that receives as an argument
function generateMovieCards(movieInfo){

    const genresDict = JSON.parse(localStorage.getItem('genresList'));
    const posterPath = String(movieInfo.poster_path).slice(1);
    const movieName = movieInfo.title;
    const movieCardsContainer = document.querySelector('#main-movie-container');
  
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
    overlayDivContainer.setAttribute('data-movie-id', movieInfo.id);
  
    const textContainer = document.createElement('p');
    textContainer.setAttribute('class', 'title is-4 py-4 pl-3 has-text-grey-lighter movie-title');
    textContainer.innerHTML = movieName;
  
  
    const movieGenreIds = movieInfo.genre_ids;
  
    
    cellContainer.appendChild(magicSound);
    cellContainer.appendChild(cardContainer);
  
    cardContainer.appendChild(cardContentContainer);
  
    cardContentContainer.appendChild(figureContainer);
  
    for (let gnr_i = 0 ; gnr_i <= Math.min(1, movieGenreIds.length - 1); gnr_i++){
  
        let genreName = genresDict.find(item => item.id === movieGenreIds[gnr_i]).name;
        let textFooterContainer = document.createElement('p');
        textFooterContainer.setAttribute('class', 'subtitle button p-2 m-3 has-background-primary-soft');   
        textFooterContainer.innerHTML = genreName;
        cardContentContainer.appendChild(textFooterContainer);
    }
    
    figureContainer.appendChild(overlayDivContainer);
    figureContainer.appendChild(imgContainer);
  
    overlayDivContainer.appendChild(textContainer);
  
    movieCardsContainer.appendChild(cellContainer);
  
    cellContainer.addEventListener('click', function(event){
  
      magicSound.play();
      setTimeout(changeToMoviePage, 2500);      
  
      const divContainer = event.target;
      localStorage.setItem('recentClickId', JSON.stringify(divContainer.getAttribute("data-movie-id")));
  
    });
}

// Function for the event listener of the back button
function changeToMoviePage(){
    location.href = './Movie_Trailer_Info.html'
}

// when the page is loaded it sets the event listener and generates all the movies from the genre chosen
document.addEventListener("DOMContentLoaded", function(event) {
    backButton.addEventListener('click', function(){
        location.href = './index.html'
    });


    for (let movies_i of moviesGenreArray){
        generateMovieCards(movies_i);
    };

});