// Include gulp
var gulp        = require('gulp'); 

// Include Plugins
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');


// Static server
gulp.task('browserSync', function() 
{
    browserSync({
        server: {
            baseDir: 'dist'
        }
    })
});


// Compile Sass files
gulp.task('sass', function() 
{
    gulp.src('src/_examples/*.scss')
        .pipe(sass().on('error', sass.logError)) // This option handles sass errors :-)
        .pipe(gulp.dest('dist/_examples/'))
        .pipe(browserSync.stream({
            once: true
        }));
});

// Watch Files For Changes then reload Browser
gulp.task('watch', ['browserSync', 'sass'], function ()
{
    gulp.watch('src/**/*.scss', ['sass']); 
    gulp.watch('dist/_examples/*.html').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['sass', 'browserSync', 'watch']);