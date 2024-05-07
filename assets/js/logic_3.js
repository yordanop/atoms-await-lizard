const tmdbOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzIwYjFiNzEzYTZhYTIzNWZmMjQ5ZmM3YzQ1NzNiZiIsInN1YiI6IjY2MzI0Yjk3MDA2YjAxMDEyZDFkMWZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ZidW01P2Y6QUvUgtmUVpvmm2fchAFrVzkFnxC5xPnY'
    }
  };

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
  
function setYoutubeVideo(nameVideo){
    const apiYoutubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDn7JhTkhkfqWRn3uNaolNmFmyZuB7fKoI&type=video&q=trailer+${nameVideo}`;
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

document.addEventListener("DOMContentLoaded", function(event) {
  getGenresList()
  .then(function(genres) {
    localStorage.setItem('genresList', JSON.stringify(genres));
  })

  const movieId = parseInt(JSON.parse(localStorage.getItem('recentClickId')));
  const moviesList = JSON.parse(localStorage.getItem('moviesGenreList'));
  const movieInfo = moviesList.find(item => item.id === movieId);

  const titleDiv = document.querySelector('#title-info');
  const synopsisDiv = document.querySelector('#movie-synopsis');
  const ratingDiv = document.querySelector('#rating');

  const movieTitle = movieInfo.title;

  titleDiv.textContent = movieTitle;
  synopsisDiv.innerHTML = movieInfo.overview;
  ratingDiv.innerHTML = `Rating : ${movieInfo.vote_average}` ;

  const searchFilter = movieTitle.replace(/ /g, '+');

//   setYoutubeVideo(searchFilter);

});