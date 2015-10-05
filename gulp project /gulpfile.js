/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulp' folder. Any files in that directory get
 *  automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

var gulp = require('gulp');
var requireDir = require('require-dir');

// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': './*.html',
  // JS sources.
  'js': './scripts/*.js',
  // SASS sources.
  'sass': './styles/*.scss',
  // Sources folder.
  'src': './src',
  // Compiled CSS folder.
  'css': './styles',
  // Distribution folder.
  'dist': './dist'
};

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', { recurse : false });

// Default task; start local server & watch for changes.
gulp.task('default', ['sass', 'html', 'lint', 'browser-sync']);











// var connect = require('gulp-connect');
// var runSequence = require('run-sequence');
// var wiredep = require('wiredep').stream;
// var useref = require('gulp-useref');
// var uglify = require('gulp-uglify');
// var minify = require('gulp-minify-css');
// var gulpif = require('gulp-if');
// // var sass = require('gulp-sass');
// var eslint = require('gulp-eslint');
// var browserSync = require('browser-sync').create();


// gulp.task('default', ['sass']);

// gulp.task('build', ['html']);


// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });


//     gulp.watch("./styles/*.scss", ['sass']);
//     gulp.watch("./*.html").on('change', browserSync.reload);
// });


// // gulp.task('sass', function() {

// //     gulp.src('./styles/*.scss')
// //         .pipe(sass())
// //         .pipe(gulp.dest('./styles'))
// //         .pipe(browserSync.stream());

// // });


// gulp.task('lint', function() {

//     return gulp.src(['scripts/*.js'])
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(eslint.failOnError());
// });


// gulp.task('html', function() {
//     var assets = useref.assets();

//     return gulp.src('./*.html')
//         .pipe(assets)
//         .pipe(gulpif('*.js', uglify()))
//         .pipe(gulpif('*.css', minify()))
//         .pipe(assets.restore())
//         .pipe(useref())
//         .pipe(gulp.dest('./dist'));
// });


// gulp.task('connect', function() {
//     connect.server({
//         livereload: true
//     });
// });

// gulp.task('watch', function() {
//     gulp.watch(['**/*.html'], ['reload']);

//     gulp.watch(['**/*.less'], ['runSeq']);
// });

// gulp.task('reload', function() {

//     gulp.src('.')
//         .pipe(connect.reload());
// });

// gulp.task('runSeq', function() {

//     runSequence('less', 'reload');

// });


// gulp.task('bower', function() {

//     gulp.src('./index.html')
//         .pipe(wiredep())
//         .pipe(gulp.dest('.'));

// });
