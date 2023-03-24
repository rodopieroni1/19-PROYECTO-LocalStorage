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
    crearHTML();
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
function crearHTML(){
    limpiarHTML();
    if(tweets.length>0){
        tweets.forEach(tweet =>{
            //Crear boton elimnar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            //Añadir la funcion de liminar
            btnEliminar.onclick = ()=>{
                borrarTweet( tweet.id );
            }
          
            // crear el HTML
            const li = document.createElement('li');
            //Añadir el texto 
            li.innerText = tweet.tweet;
            
            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}
//Eliminar Texto
function eliminarTexto(){
console.log('Pasa por aqui senor,pasa por aqui...');   
}

//Agregalos tweets a localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//borrar tweet
function borrarTweet(id){
tweets = tweets.filter( tweet => tweet.id !== id);
crearHTML();
}

//limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}