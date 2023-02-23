document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    crearGaleria();
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');


    //recorremos nuestras imagenes con un for
    for(let i = 1; i<=12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif" >
        <source srcset="build/img/thumb/${i}.webp" type="image/webp" >
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `

        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen)
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif" >
    <source srcset="build/img/grande/${id}.webp" type="image/webp" >
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `

    //crea overlay para que la imagen se haga grande al darle click
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Boton para cerrar el modal
    const cerrarFoto = document.createElement('p');
    cerrarFoto.textContent = 'X';
    cerrarFoto.classList.add('btn-cerrar');

    //agregamos el boton al overlay
    overlay.appendChild(cerrarFoto);


    cerrarFoto.onclick = function(){
        //quitamos la clase del body que hace que no se pueda dar scroll
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')

        //quitamos la imagen grande
        overlay.remove();
    }

    //haciendo que se cierre dando click fuera de la imagen
    overlay.onclick = function(){
        //quitamos la clase del body que hace que no se pueda dar scroll
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        //quitamos la imagen grande
        overlay.remove();
    }

    //quiero mostrar el overlay en mi body
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')

}