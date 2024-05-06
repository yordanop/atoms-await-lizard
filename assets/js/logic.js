
const btnContainer = document.querySelector('#button-container');



  //agregar event listener para que se vaya a la otra pagina obtener el data genre(linea 23)
    // que obtenga el id que tiene el genero y lo ponga en la función de logic_2

function createGenreButtons(){
    const allGenres = JSON.parse(localStorage.getItem('genresList'));
 for(let gen_i of allGenres){

        createButton(gen_i.id, gen_i.name);
    
}
    }




function createButton(buttonID, buttonName){
    const newButton = document.createElement('button');
    newButton.setAttribute("data-genre", buttonID)
    newButton.setAttribute('class', "button is-primary m-3" );
    newButton.innerHTML= buttonName;
    btnContainer.appendChild(newButton);


//revisar sintaxis del sig: 
//newButton.add.eventListener(fuction(event){
//cosole.log(event.target) ----> obtener info del boton del click 
//cuando obtener data genre va en inputgenre(linea 33)
//})
// getAndSaveGenreMoviesList(inputGenre)
// .then(function(moviesList) {
//     localStorage.setItem('moviesGenreList', JSON.stringify(moviesList));
// })

}


    createGenreButtons();

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

    



  