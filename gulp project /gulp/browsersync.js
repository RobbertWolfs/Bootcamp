var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./styles/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    gulp.src('./styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./styles'))
        .pipe(browserSync.stream());
});
