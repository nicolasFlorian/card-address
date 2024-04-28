const gulp = require('gulp');
const spriteSvg = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');

const config = {
    mode: {
        symbol: {
            sprite: 'sprite.svg',
            example: false
        },
        svg:{
            xmlDeclaration: false,
            doctypeDeclaration: false
        }
    }
}

function svgSprite(){
    return gulp.src('./src/icons/*.svg')
    .pipe(spriteSvg(config))
    .pipe(cheerio({
        run: ($) => {
            $('[fill]').removeAttr('fill');
        },
        parserOptions: {xmlMode: true}
    }))
    .pipe(gulp.dest('./src/sprite/'));
}

exports.sprite = svgSprite;

function watchFiles(){
    gulp.watch('./src/icons', svgSprite);
}

exports.default = watchFiles;