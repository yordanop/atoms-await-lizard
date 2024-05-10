const backButton = document.querySelector('#return-button');
const titleDiv = document.querySelector('#title-info');
const synopsisDiv = document.querySelector('#movie-synopsis');
const ratingDiv_1 = document.querySelector('#rating');
const movieId = parseInt(JSON.parse(localStorage.getItem('recentClickId')));
const moviesList = JSON.parse(localStorage.getItem('moviesGenreList'));
const containerReviews = document.querySelector('#review-container');
// ----------------------------------Modal----------------------------------------------------------
let button = document.getElementById('button');
let modal = document.getElementById('page-modal');
let reviewHistory = JSON.parse(localStorage.getItem("reviews")) || [];
let close = document.getElementsByClassName('modal-close')[0];
let submitButton = document.getElementById('submitButton');
let cancelButton = document.getElementById('cancelButton');
button.onclick = function () {
    modal.style.display = 'block';
}
close.onclick = function () {
    modal.style.display = 'none';
}
window.onclick = function (event) {
    if (event.target.className == 'modal-background') {
        modal.style.display = 'none';
    }
}
submitButton.onclick = function () {
    console.log();
    let nameUser = document.querySelector("#username").value;
    let entryTitleUser = document.querySelector("#entryTitle").value;
    let reviewEntryUser = document.querySelector("#reviewEntry").value;
    let movieCodeUser = movieId;
    let ratingUser = document.querySelector("#rating_1").value;

  console.log(ratingUser);
    if(nameUser !== '' && entryTitleUser !== '' && reviewEntryUser !== ''){
      
      reviewHistory.push({
          username:nameUser,
          rating: ratingUser,
          entryTitle:entryTitleUser,
          reviewEntry:reviewEntryUser,
          movieCode:movieCodeUser
      })
      localStorage.setItem("reviews",JSON.stringify(reviewHistory));
      document.querySelector("#username").value = '';
      document.querySelector("#rating").value = '';
      document.querySelector("#entryTitle").value = '';
      document.querySelector("#reviewEntry").value = '';
      modal.style.display = 'none';
      renderTodos();
    }

}
cancelButton.onclick = function () {
    modal.style.display = 'none';
}
function getSpecificReviews(movieReviewsAll, specificId){
  const specificRevies = [];
  for(let movie_i of movieReviewsAll){
    if (movie_i.movieCode === specificId){
      specificRevies.push(movie_i);
    }
  };
  localStorage.setItem('currentMovieReviews', JSON.stringify(specificRevies));
}
//append new elements to the array, considering user inputs
function renderTodos() {
  deleteallReviews();
  getSpecificReviews(reviewHistory, movieId);
  const reviews = JSON.parse(localStorage.getItem('currentMovieReviews'));
  for (let review_i of reviews) {
    const reviewContainer = document.createElement('div');
    const titleReview = document.createElement('h3');
    const reviewContentContainer = document.createElement('div');
    const ratingReview = document.createElement('p');
    const contentReview = document.createElement('p');

    reviewContainer.setAttribute('class', 'card is-flex is-flex-direction-column review-container-entry m-3 has-background-primary-soft p-3');
    reviewContentContainer.setAttribute('class', 'card-content ');

    titleReview.setAttribute('class', 'title is-4 mx-4');
    titleReview.textContent = `${review_i.entryTitle} - by ${review_i.username} `;


    ratingReview.setAttribute('class', 'content mx-5');
    ratingReview.textContent = review_i.rating;

    contentReview.setAttribute('class', 'content mx-4');
    contentReview.textContent = review_i.reviewEntry;

    reviewContainer.appendChild(titleReview);

    reviewContainer.appendChild(ratingReview);
    reviewContainer.appendChild(contentReview);
    containerReviews.appendChild(reviewContainer);
  }
}

function deleteallReviews(){
  const reviewsContainers = document.querySelectorAll('.review-container-entry');
  // localStorage.clear();
  for(let reviewcontainer_i of reviewsContainers){
    reviewcontainer_i.remove();
  }
}
// -----------------------------------------------------------------------------------------------------------------
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
document.addEventListener("DOMContentLoaded", function(event) {
    
    const movieInfo = moviesList.find(item => item.id === movieId);
    const movieTitle = movieInfo.title;
    const searchFilter = movieTitle.replace(/ /g, '+');
    backButton.addEventListener('click', function(){
        location.href = './Movie_Cards.html';
    });
    titleDiv.textContent = movieTitle;
    synopsisDiv.innerHTML = movieInfo.overview;
    ratingDiv_1.innerHTML = `Rating : ${movieInfo.vote_average}` ;
    
    renderTodos();
    setYoutubeVideo(searchFilter);
});