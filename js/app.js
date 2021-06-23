// Variables
const lista = document.querySelector('#lista');
const formulario = document.querySelector('#formulario');
const monedaa = document.querySelector('#moneda');
let autos = [];

// Event Listeners
eventListeners();
monedaa.addEventListener('input', e => {

     limpiarHTML();
     
     if(autos.length > 0 ) {
          autos.forEach( car =>  {
               // crear boton de eliminar
               const botonBorrar = document.createElement('td');
               botonBorrar.classList = 'borrar-car';
               botonBorrar.innerText = 'X';
     
               // Crear elemento y añadirle el contenido a la lista
               const li = document.createElement('tr');

               if(e.target.value=="Q") // validamos para conversion

               {
                    const conversion = car.PR * 7.8
                    li.innerHTML= `<td hidden>${car.id}</td><td>${car.MA}</td><td>${car.MO}</td><td> ${e.target.value}${conversion}</td>   `
                    ;
               }
               else{
                    li.innerHTML= `<td hidden>${car.id}</td><td>${car.MA}</td><td>${car.MO}</td><td> ${e.target.value}${car.PR}</td>   `
                    ;
               }
              
             

              
               li.appendChild(botonBorrar);

                
               li.dataset.carcarId = car.id;

               // añade el car a la lista
               lista.appendChild(li);




               
          });
     }

     sincronizarStorage();

})

function eventListeners() {
     //Cuando se envia el formulario
 

     
     formulario.addEventListener('submit', agregarTweet);

     // Borrar Tweets
     lista.addEventListener('click', borrarTweet);

     // Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          autos = JSON.parse( localStorage.getItem('auto') ) || []  ;
          console.log(autos);
          crearHTML();
     });
}

// Añadir car del formulario
function agregarTweet(e) {
     e.preventDefault();
     // leer el valor del textarea
     const marca = document.querySelector('#marca').value;
     const modelo = document.querySelector('#modelo').value;
     const precio = document.querySelector('#precio').value;
     
     // validación
     if(marca === '' || modelo == '' || precio=='') {
          mostrarError('Todos los campos son necesarios ');
          return;
     }

     // Crear un objeto Tweet
     const autosOBJ = {
          id: Date.now(),
          MA: marca,
          MO:modelo,
          PR:precio

     }

     // Añadirlo a mis tweets
     autos = [...autos, autosOBJ];
     
     console.log(autos)
     // Una vez agregado, mandamos renderizar nuestro HTML
     crearHTML();

     // Reiniciar el formulario
     formulario.reset();
}

function mostrarError(error) {
     const mensajeEerror = document.createElement('p');
     mensajeEerror.textContent = error;
     mensajeEerror.classList.add('error');

     const contenido = document.querySelector('#contenido');
     contenido.appendChild(mensajeEerror);

     setTimeout(() => {
          mensajeEerror.remove();
     }, 3000);
}

function crearHTML() {
     limpiarHTML();
     
     if(autos.length > 0 ) {
          autos.forEach( car =>  {
               // crear boton de eliminar
               const botonBorrar = document.createElement('td');
               botonBorrar.classList = 'borrar-car';
               botonBorrar.innerText = 'X';
     
               // Crear elemento y añadirle el contenido a la lista
               const li = document.createElement('tr');

               // Añade el texto
              li.innerHTML= `<td hidden>${car.id}</td><td>${car.MA}</td><td>${car.MO}</td><td>$ ${car.PR}</td>   `
               ;

              
               li.appendChild(botonBorrar);

                
               li.dataset.carcarId = car.id;

               // añade el car a la lista
               lista.appendChild(li);




               
          });
     }

     sincronizarStorage();
}

// Elimina el Tweet del DOM
function borrarTweet(e) {
     e.preventDefault();

     // console.log(e.target.parentElement.dataset.carcarId);
     const id = e.target.parentElement.dataset.carcarId;
     autos = autos.filter( car => car.id != id  );
     crearHTML();
}

// Agrega car a local storage
function sincronizarStorage() {
     localStorage.setItem('auto', JSON.stringify(autos));
}

// Elimina los cursos del carrito en el DOM
function limpiarHTML() {
     while(lista.firstChild) {
          lista.removeChild(lista.firstChild);
     }
}