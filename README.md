# Compilar SASS con npm

# Variables en SASS
Estas son declaradas con el signo de $
Para crear diferentes archivos scss, al que no sea el app.scss, se le pondra un _ , por ejemplo, _variables.scss

# Script 
al ejecutar el script de sass, decimos que ejecute lo que esta en la carpeta src/scss y que lo guarde en build/css
```
"scripts": {
    "sass": "sass src/scss:build/css"
  }
```
# Ejemplo sencillo
```
function tarea(done){
    console.log('ola');

    done() //para que no de un error en la consola
}
exports.tarea = tarea;
```

# Que son los pipes
En palabras sencillas una accion que se realiza detras de otra

# Importar
## Forma viejita
```
@import 'direccion/direccion';
```
## Nueva
En la principal en vez de import se usara use y en los index.scss se usara el @forward que es al archivo que se esta apuntando

# Habilitar 1rem=10px
```
html{
    font-size: 62.5%;
    box-sizing: border-box;
}
```
Con este codigo se habilita que 1rem sea a 10px y es muchisimo mejor trabajar asi

# Mejora de performance
En la imagen se recomienda poner un width="200" height="300" en el html para que se muestre de inmediato la imagen, pero eso nos dara problemas, entonces en el css tenemos nuestras clases globales para las imagenes (_globales.scss) lo arreglamos poniendo un width de 100% y un height auto para que pueda ajustarse la imagen correctamente

# Otra funcion de &
Si tenemos 
```
.pase{
    .pase-header{

    }
    .pase-body{

    }
    .pase-footer{
        
    }
}
```
Podemos ver como se comparte la clase de pase, entonces se puede ahorrar un poco de codigo de la siguiente manera
```
.pase{
    &-header{

    }
    &-body{

    }
    &-footer{
        
    }
}
```