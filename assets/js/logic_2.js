// const tmdbOptions = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzIwYjFiNzEzYTZhYTIzNWZmMjQ5ZmM3YzQ1NzNiZiIsInN1YiI6IjY2MzI0Yjk3MDA2YjAxMDEyZDFkMWZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ZidW01P2Y6QUvUgtmUVpvmm2fchAFrVzkFnxC5xPnY'
//     }
//   };

function getAndSaveGenreMoviesList(genreID){

    const apiUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreID}`;
  
    return fetch(apiUrl, tmdbOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
          
        //   const posterPath = String(data.results[1].poster_path).slice(1);
          
        return data.results;

        //   cardImage.setAttribute('src', `http://image.tmdb.org/t/p/w342/${posterPath}`);
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert('Unable to connect TMDB');
    });
  }

function generateMovieCards(movieInfo){
    const posterPath = String(movieInfo.poster_path).slice(1);
    const movieName = movieInfo.title;


    const cellContainer = document.createElement('div');
    cellContainer.setAttribute('class', 'cell');
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
    textContainer.innerHTML(`movieName`);
    const textFooterContainer = document.createElement('p');
    textFooterContainer.setAttribute('class', 'subtitle button p-2 m-3');
    
}


const inputGenre = 28;
const genresDict = JSON.parse(localStorage.getItem('genresList'));

let genreName = genresDict.find(item => item.id === inputGenre).name;

getAndSaveGenreMoviesList(inputGenre)
.then(function(moviesList) {
    localStorage.setItem('moviesGenreList', JSON.stringify(moviesList));
})



//   <div class="cell">
//   <div class="card m-3">
//       <div class="card-content moviePoster p-0">
//           <figure class="card-image">
//               <img id="poster-container" src="" alt="">
//               <div class="is-overlay is-flex is-flex-direction-column-reverse">
//                   <p class="title is-4 py-4 pl-3 movie-title">
//                       “There are two hard things in computer science: cache invalidation, naming
//                       things, and off-by-one errors.”
//                   </p>
//               </div>
//           </figure>
//           <p class="subtitle button p-2 m-3">Jeff Atwood</p>
//       </div>
//   </div>
// </div>