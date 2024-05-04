
const btnContainer = document.querySelector('#button-container');



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

}


    createGenreButtons();
    



  