//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];
//Event Listener
eventListenetr();
function eventListenetr(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweets);
    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets'));
        console.log(tweets);
    });
}

//Funciones
function agregarTweets(e){
    e.preventDefault(); // cmo es un formulario se pasa el evento
    // text area donde se carga el texto del usuario
    const tweet = document.querySelector('#tweet').value;
    if(tweet === ''){
        mostrarError('Un mensaje no puede estar vacio');
        return;
    }
    const tweetObj={
        id: Date.now(),
        tweet:tweet
    }
    //añadir ala rreglo el tweet
    tweets = [...tweets, tweetObj];
    //Una vez agregado vamos a crear el HTML
    craerHTML();
    console.log(tweets);    
}

//Mostrar mensaje de error 
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    //Insertando en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina el mensaje en 3 segundos
    setTimeout(()=>{
        mensajeError.remove();
    }, 3000);
}

//creamos el HTML
function craerHTML(){
    limpiarHTML();
    if(tweets.length>0){
        tweets.forEach(tweet =>{
            // crear el HTML
            const li = document.createElement('li');
            //Añadir el texto 
            li.innerText = tweet.tweet;
            //Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}
//Agregalos tweets a localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}