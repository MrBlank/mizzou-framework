// Include gulp
var gulp        = require('gulp'); 

// Include Plugins
var sass        = require('gulp-sass');

// Compile examples
gulp.task('exampleStyles', function() 
{
    gulp.src('src/_examples/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/_examples/'));
});

//Watch task
gulp.task('default',function() 
{
    gulp.watch('src/**/*.scss',['exampleStyles']);
});