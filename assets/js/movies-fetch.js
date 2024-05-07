
const tmdbOptions = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzIwYjFiNzEzYTZhYTIzNWZmMjQ5ZmM3YzQ1NzNiZiIsInN1YiI6IjY2MzI0Yjk3MDA2YjAxMDEyZDFkMWZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ZidW01P2Y6QUvUgtmUVpvmm2fchAFrVzkFnxC5xPnY'
  }
};

const owenWilsonOptions = {
  method: 'GET',
  headers: {
      accept: 'application/json'
  }
};


$('.movieCard').on('click', function(){
  console.log(this);
  console.log($(this).children(".card-content"));
})

const cardImage = document.querySelector('#poster-container');
let urlBase = null;
function getBaseURL(){
  const apiUrl = `https://api.themoviedb.org/3/configuration`;
  fetch(apiUrl, tmdbOptions)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        urlBase = String(data.images.base_url);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  })
  .catch(function (error) {
    alert('Unable to connect TMDB');
  });
}

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

function getRandomWow(audioContainer){
  const apiUrl = `https://owen-wilson-wow-api.onrender.com/wows/random`;
  fetch(apiUrl, owenWilsonOptions)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        audioContainer.src = `${data[0].audio}`;
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  })
  .catch(function (error) {
    alert('Unable to connect TMDB');
  });
}

function generateYoutubeVideo(VideoIdFromSearch){
  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('trailer-player', {
      height: '390',
      width: '640',
      videoId: VideoIdFromSearch,
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady
      }
    });
  }
  function onPlayerReady(event) {
    event.target.playVideo();
  }
}

function setYoutubeVideo(){
  const apiYoutubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDn7JhTkhkfqWRn3uNaolNmFmyZuB7fKoI&type=video&q=trailer+scream`;
  fetch(apiYoutubeUrl)
  .then(function (response) {
      if (response.ok) {
      response.json().then(function (data) {
          generateYoutubeVideo(data.items[0].id.videoId);
      });
      } else {
      alert(`Error:${response.statusText}`);
      }
  })
  .catch(function (error) {
      alert('Unable to connect Youtube');
  });
}



  
// document.addEventListener("DOMContentLoaded", function(event) {
//   getGenresList()
//   .then(function(genres) {
//     localStorage.setItem('genresList', JSON.stringify(genres));
//   })

//   // setYoutubeVideo();

// });




// Testing purposes 

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
  textContainer.setAttribute('class', 'title is-4 py-4 pl-3 movie-title');
  textContainer.innerHTML = movieName;


  const movieGenreIds = movieInfo.genre_ids;

  
  cellContainer.appendChild(magicSound);
  cellContainer.appendChild(cardContainer);

  cardContainer.appendChild(cardContentContainer);

  cardContentContainer.appendChild(figureContainer);

  for (let gnr_i = 0 ; gnr_i <= Math.min(1, movieGenreIds.length - 1); gnr_i++){

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

  cellContainer.addEventListener('click', function(event){

    magicSound.play();
    setTimeout(changeToMoviePage, 2500);      

    const divContainer = event.target;
    localStorage.setItem('recentClickId', JSON.stringify(divContainer.getAttribute("data-movie-id")));

  });
}

function changeToMoviePage(){
  location.href = './Movie-Trailer-Info.html'
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





document.addEventListener("DOMContentLoaded", function(event) {
  getGenresList()
  .then(function(genres) {
    localStorage.setItem('genresList', JSON.stringify(genres));
  });

  
  const genresDict = JSON.parse(localStorage.getItem('genresList'));
  const inputGenre = 99;
  let genreName = genresDict.find(item => item.id === inputGenre).name;

  
  getAndSaveGenreMoviesList(inputGenre)
  .then(function(moviesList) {
    localStorage.setItem('moviesGenreList', JSON.stringify(moviesList));
  });

  

  const moviesGenreArray = JSON.parse(localStorage.getItem('moviesGenreList'));
  for (let movies_i of moviesGenreArray){
    generateMovieCards(movies_i);
  };


});


