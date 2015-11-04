var jade = require('gulp-jade');
var gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('templates', function() {

  gulp.src('./*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {

gulp.watch('./**/*.jade', ['templates'])

});




gulp.task('default', ['watch']);
