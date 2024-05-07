var button = document.getElementById('button');
var modal = document.getElementById('page-modal');
var close = document.getElementsByClassName('modal-close')[0];
let reviewHistory = JSON.parse(localStorage.getItem("reviews")) || [];

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

$('.submitbtn').on('click', function(){
    let username = $("#username").val();
    let movieTitle = $("#movieTitle").val();
    let rating = $("#rating").val();
    let entryTitle = $("#entryTitle").val();
    let reviewEntry = $("#reviewEntry").val();
    let movieCode = 123;
    reviewHistory.push({ 
        username:username,
        movieTitle:movieTitle,
        rating:rating,
        entryTitle:entryTitle,
        reviewEntry:reviewEntry,
        movieCode:movieCode,
    }) 
    localStorage.setItem("reviews",JSON.stringify(reviewHistory))
    window.location.reload()
  })

  //document ready jQuery or blog info