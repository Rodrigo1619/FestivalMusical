const {src, dest, watch, parallel} = require('gulp'); 

//variables para compilar scss a css
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

//para la conversion de imagenes
const webp = require('gulp-webp');

function css(done){
    src('src/scss/**/*.scss') //identificar archivo de sass, los * identifican a los demas archivos scss
    .pipe(plumber()) //evita que se detenga el workflow si hay un error
    .pipe(sass()) //compilarlo con los pipes
    .pipe(dest("build/css"));//almacenar en disco duro con los dest

    done();//avisa cuando se ha llegado al final de la funcion y no de error en consola
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

function dev(done){
    watch('src/scss/**/*.scss', css)//esta al pendiente de todos los cambios en la carpeta scss

    done();
}
exports.css=css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev); //parallel hara que se ejecute al mismo tiempo en paralelo estas 2 funciones