var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');


gulp.task('bSync', function() {

    browserSync.init({
        server : {
            baseDir : './'
        }
    });

    gulp.watch("./css/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js", ['lint']);

});

gulp.task('sass', function() {
    gulp.src('./css/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function() {

    return gulp.src(['js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

