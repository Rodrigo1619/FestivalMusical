const {src, dest, watch} = require('gulp'); 
const sass = require("gulp-sass")(require('sass'));

function css(done){
    src('src/scss/**/*.scss') //identificar archivo de sass, los * identifican a los demas archivos scss
    .pipe(sass()) //compilarlo con los pipes
    .pipe(dest("build/css"));//almacenar en disco duro con los dest

    done();//avisa cuando se ha llegado al final de la funcion y no de error en consola
}

function dev(done){
    watch('src/scss/**/*.scss', css)

    done()
}
exports.css=css;
exports.dev=dev;