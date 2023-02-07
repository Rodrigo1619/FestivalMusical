const {src, dest, watch} = require('gulp'); 
const sass = require("gulp-sass")(require('sass'));

function css(done){
    src('src/scss/app.scss') //identificar archivo de sass
    .pipe(sass()) //compilarlo con los pipes
    .pipe(dest("build/css"));//almacenar en disco duro con los dest

    done();//avisa cuando se ha llegado al final de la funcion y no de error en consola
}

function dev(done){
    watch('src/scss/app.scss', css)

    done()
}
exports.css=css;
exports.dev=dev;