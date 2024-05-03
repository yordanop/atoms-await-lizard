
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

var audioContainer = document.querySelector('#wow-container')
function getRandomWow(){

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
        // loadVideoById:`${VideoIdFromSearch}`,
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

const buttonTest = document.querySelector('#test-button');
buttonTest.addEventListener('click', function(){
    audioContainer.play();
});

// getGenresList();

// let id = genresList.find(item => item.name === 2);

// getRandomWow();


    // const apiMovieUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=28`;



function setYoutubeVideo(){

    const apiYoutubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC4dgCkBRKh4k4-5zlus895GfGXFbMNAQc&type=video&q=trailer+scream`;

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



// setYoutubeVideo()


function getAndSetPoster(){

  const apiUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=28`;

  fetch(apiUrl, tmdbOptions)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        
        const posterPath = String(data.results[1].poster_path).slice(1);        
        // console.log(`http://image.tmdb.org/t/p/${posterPath}`)
        cardImage.setAttribute('src', `http://image.tmdb.org/t/p/w342/${posterPath}`);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  })
  .catch(function (error) {
    alert('Unable to connect TMDB');
  });
}

getAndSetPoster();

  
document.addEventListener("DOMContentLoaded", function(event) {

  getGenresList()
  .then(function(genres) {
    localStorage.setItem('genresList', JSON.stringify(genres));
  })

});
