const {src, dest, watch, parallel} = require('gulp'); 

//variables para compilar scss a css
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

//para la conversion de imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    src('src/scss/**/*.scss') //identificar archivo de sass, los * identifican a los demas archivos scss
    .pipe(plumber()) //evita que se detenga el workflow si hay un error
    .pipe(sass()) //compilarlo con los pipes
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

function dev(done){
    watch('src/scss/**/*.scss', css)//esta al pendiente de todos los cambios en la carpeta scss

    done();
}
exports.css=css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
//parallel hara que se ejecute al mismo tiempo en paralelo estas 2 funciones
exports.dev = parallel(imagenes, versionWebp, versionAvif,dev); 