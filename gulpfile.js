var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite');

var config = {
    mode: {
        symbol: true
    }
};

gulp.task('default', function() {
    gulp.src('src/img/icons/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('out'));
});