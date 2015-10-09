var gulp = require('gulp');
var requireDir = require('require-dir');

// Specify paths & globbing patterns for tasks.
global.paths = {
    // HTML sources.
    'html': './*.html',
    // JS sources.
    'js': './js/*.js',
    // SASS sources.
    'sass': './css/*.scss',
    // Sources folder.
    'src': './src',
    // Compiled CSS folder.
    'css': './css',
    // Distribution folder.
    'dist': './dist'
};

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', { recurse : false });

// Default task; start local server & watch for changes.
gulp.task('default', ['sass', 'lint','bower', 'html', 'bSync']);



