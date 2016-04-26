'use strict';
var minify = {
    css: {
        option: true,
        onlyMin: false
    },
    
};
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var gclean = require('gulp-clean');


var WATCH = ['sass'];
var DEFAULTTASK = ['sass', 'watch'];

// Directory structures
var DIRECTORIES = {
    src : '/',
    publicStyles: 'css',
    privateStyles: 'scss',
    publicImg: 'img/cleared',
    privateImg: 'img/original'
    
};

var changeEvent = function(evt) {
    gutil.log('File', gutil.colors.yellow(evt.path.replace(new RegExp('/.*(?=/' + DIRECTORIES.src + ')/'), '')), 'was', gutil.colors.green(evt.type));
};

// Clean public directories for styles/scripts
gulp.task('clean-styles', function(){
    return gulp.src(DIRECTORIES.publicStyles, {read: false})
        .pipe(gclean());
});
 
gulp.task('sass', ['clean-styles'], function () {
  gulp.src(DIRECTORIES.privateStyles + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(DIRECTORIES.publicStyles));
    
});

/* minify */
if(minify.css.option){
    var cssmin = require('gulp-cssmin');
    var rename = require('gulp-rename');
    
    gulp.task('mini', ['clean-styles'], function () {
        gulp.src(DIRECTORIES.privateStyles + '/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(DIRECTORIES.publicStyles));
    });
    
    WATCH.push('mini');
    DEFAULTTASK.push('mini');
    
    if(minify.css.onlyMin){
        WATCH = ['mini'];
        DEFAULTTASK = ['mini', 'watch'];
    }
}



 
gulp.task('watch', function() {
    gulp.watch([DIRECTORIES.privateStyles + '*.scss', DIRECTORIES.privateStyles + '**/*.scss', DIRECTORIES.privateStyles + '**/**/*.scss'], WATCH).on('change', function(event){
        changeEvent(event);
    });
});
// Default Task
gulp.task('default', DEFAULTTASK);