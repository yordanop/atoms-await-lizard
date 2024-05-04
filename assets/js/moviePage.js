const todoInput = document.querySelector('#todo-text');
const titleInput = document.querySelector('#title-text');
const entryInput = document.querySelector('#entry-text');
const buttonSubmit = document.querySelector('#btn-submit');
const todos = JSON.parse(localStorage.getItem("todos")) || [];

//using stringify to convert objects to strings
function storeTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

//setting up the "Submit your idea" button
buttonSubmit.addEventListener('click', function (event) {

  const todoText = todoInput.value.trim();
  const titleText = titleInput.value.trim();
  const entryText = entryInput.value.trim();

  if (todoText === '' || titleText === '' || entryText === '') {
    //alert the user if he/she doesn't fill out all the required fields
    alert("Please complete all the required fields.");
    return;
  }
  else {
  todos.push({todoText:todoText,titleText:titleText,entryText:entryText});
  storeTodos();
  //link with the second page (blog.html)
  location.href = "blog.html";
  }
});

//constants to make the dark/light switch work
const themeSwitcher = document.querySelector('#theme-switcher');
const card = document.querySelector('.card');
const row = document.querySctor('.row');
const container = document.querySelector('.container');
 
let mode = 'light';

themeSwitcher.addEventListener('click', function () {
  if (mode === 'light') {
    mode = 'dark';
    card.setAttribute('class', 'dark');
    row.setAttribute('class', 'dark');
    container.setAttribute('class', 'dark');
  }
  else {
    mode = 'light';
    card.setAttribute('class', 'light');
    row.setAttribute('class', 'light');
    container.setAttribute('class', 'light');
  }
});


