const backButton = document.querySelector('#return-button');
const titleDiv = document.querySelector('#title-info');
const synopsisDiv = document.querySelector('#movie-synopsis');
const ratingDiv = document.querySelector('#rating');

const movieId = parseInt(JSON.parse(localStorage.getItem('recentClickId')));
const moviesList = JSON.parse(localStorage.getItem('moviesGenreList'));


// ----------------------------------Modal----------------------------------------------------------
let button = document.getElementById('button');
let modal = document.getElementById('page-modal');
let close = document.getElementsByClassName('modal-close')[0];
let reviewHistory = JSON.parse(localStorage.getItem("reviews")) || [];
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
    let username = document.querySelector("#username").value;
    let rating = document.querySelector("#rating").value;
    let entryTitle = document.querySelector("#entryTitle").value;
    let reviewEntry = document.querySelector("#reviewEntry").value;
    let movieCode = parseInt(JSON.parse(localStorage.getItem("recentclickId")));
    reviewHistory.push({ 
        username:username,
        rating:rating,
        entryTitle:entryTitle,
        reviewEntry:reviewEntry,
        movieCode:movieCode
    }) 
    console.log();
    localStorage.setItem("reviews",JSON.stringify(reviewHistory));

    document.querySelector("#username").value = '';
    document.querySelector("#rating").value = '';
    document.querySelector("#entryTitle").value = '';
    document.querySelector("#reviewEntry").value = '';
    modal.style.display = 'none';
}

cancelButton.onclick = function () {
    modal.style.display = 'none';
}

//defining the constants needed for the local storage
// const todoList = document.querySelector('#todo-list');
// console.log(todoList);

//using parse to convert strings to objects
const todos = JSON.parse(localStorage.getItem("todos")) || [];

function obtainSpecificReviews(){
  const reviewsMovie = [];

  for(let reviews_i of todos){
    if (reviews_i.movieCode === movieId){
      reviewsMovie.push(reviews_i);
    }
  }

  localStorage.setItem('currentMovieRevies', reviewsMovie);
};






//append new elements to the array, considering user inputs
function renderTodos() {
//   todoList.innerHTML = '';

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const div = document.createElement('div');
    div.classList.add("Post");
    todoList.appendChild(div);

    let h2 = document.createElement('h2');
    h2.textContent = todo.todoText;
    h2.setAttribute('data-index', i);
    div.appendChild(h2);

    let h3 = document.createElement('h3');
    h3.textContent = todo.titleText;
    h3.setAttribute('data-index', i);
    div.appendChild(h3);

    let p = document.createElement('p');
    p.textContent = todo.entryText;
    p.setAttribute('data-index', i);
    div.appendChild(p);
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

    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    renderTodos();

    const movieInfo = moviesList.find(item => item.id === movieId);
    const movieTitle = movieInfo.title;
    const searchFilter = movieTitle.replace(/ /g, '+');

    backButton.addEventListener('click', function(){
        location.href = './Movie_Cards.html';
    });

    titleDiv.textContent = movieTitle;
    synopsisDiv.innerHTML = movieInfo.overview;
    ratingDiv.innerHTML = `Rating : ${movieInfo.vote_average}` ;

    // setYoutubeVideo(searchFilter);
});