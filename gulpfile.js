const {src, dest, watch, parallel} = require('gulp'); 

//variables para compilar scss a css
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//variables para el performance de js
const terser = require('gulp-terser-js');

//para la conversion de imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    src('src/scss/**/*.scss') //identificar archivo de sass, los * identifican a los demas archivos scss
    .pipe(sourcemaps.init())//guarda referencia de donde se va guardando el codigo css
    .pipe(plumber()) //evita que se detenga el workflow si hay un error
    .pipe(sass()) //compilarlo con los pipes
    .pipe(postcss([autoprefixer(), cssnano()])) //comprime nuestro codigo css
    .pipe(sourcemaps.write('.')) //. para que se guarde en la misma ubicacion del css
    .pipe(dest("build/css"));//almacenar en disco duro con los dest

    done();//avisa cuando se ha llegado al final de la funcion y no de error en consola
}

function imagenes(done){
    const opciones = {
        optimizationLevel : 3
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))//guarda la optimizacion de las imagenes en cache
        .pipe(dest('build/img'))

    done();
}

function versionWebp(done){
    //opciones para la calidad de la imagen
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}

function versionAvif(done){
    //opciones para la calidad de la imagen
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();
}
function javascript(done){
    src('src/js/**/*.js') //identificamos el archivo que nos queremos llevar
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js')); //lo mandamos a este directorio
    
        done();
}


function dev(done){
    watch('src/scss/**/*.scss', css)//esta al pendiente de todos los cambios en la carpeta scss
    watch('src/js/**/*.js', javascript)//esta al pendiente de todos los cambios en la carpeta js

    done();
}

//exportaciones
exports.css=css;
exports.js = javascript
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
//parallel hara que se ejecute al mismo tiempo en paralelo estas funciones
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript ,dev); 