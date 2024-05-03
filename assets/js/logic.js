
const btnContainer = document.querySelector('#button-container');



function createGenreButtons(){
    const allGenres = JSON.parse(localStorage.getItem('genresList'));
    for(let gen_i of allGenres){
        // poner funcion de createButton en este for para que genere todos los botones
        createButton(gen_i.id, gen_i.name);
        // createButton(gen_i.id, ge_i.name);
    }
}


function createButton(buttonID, buttonName){
    // const newButton = document.createElement('button');
    const newButton = document.createElement('button');
    // Arreglar siguiente linea
    newButton.setAttribute('data', `'genre-id' : ${buttonID}` )
    newButton.setAttribute('class', "button" );
    // ponerle nombre al boton
    // asignarle las clases necesarias de bulma para styling
    console.group('hola');
    btnContainer.appendChild(newButton);
}


// document.addEventListener("DOMContentLoaded", function(event) {
    createGenreButtons();
    
//   });



  