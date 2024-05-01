
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


function getBaseURL(){

    const apiUrl = `https://api.themoviedb.org/3/configuration`;

    fetch(apiUrl, tmdbOptions)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          return data.images.base_url;
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

    fetch(apiUrl, tmdbOptions)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert('Unable to connect TMDB');
    });
}

var audioContainer = document.querySelector('#wow-container')
function getRandomWow(){

    const apiUrl = `https://owen-wilson-wow-api.onrender.com/wows/random`;

    fetch(apiUrl, owenWilsonOptions)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data[0].audio);
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



document.addEventListener("DOMContentLoaded", function(event) {
    //código a ejecutar cuando existe la certeza de que el DOM está listo para recibir acciones
    getRandomWow();
    // audioContainer.play();
});


function generateYoutubeVideo(){
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player('player_1', {
        height: '390',
        width: '640',
        videoId: 'ConEzQ5XkM4',
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

const buttonTest = document.querySelector('#test-button');
buttonTest.addEventListener('click', function(){
    audioContainer.play();
});

// generateYoutubeVideo();
// getRandomWow();



    // const apiMovieGenres = `https://api.themoviedb.org/3/genre/movie/list`;
    // const apiMovieUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=28&page=2`;