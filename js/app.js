//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

//Event Listener
eventListenetr();
function eventListenetr(){
    formulario.addEventListener('submit', agregarTweets);
}

//Funciones
function agregarTweets(e){
    e.prevetDefault();
    console.log('Agregando Tweets');
}
