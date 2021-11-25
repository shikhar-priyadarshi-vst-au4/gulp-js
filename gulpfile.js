var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
// To create gulp task

// gulp.task('first-task', async function(){
//     return gulp.src('source-files') // get source files with gulp.src
//             .pipe(aGulpPlugin()) // sends it through a gulp plugin
//             .pipe(gulp.dest('destination')) // outputs the file in the destination folder
// })


// To handle async behaviour of gulp 
// https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async

//sass-handler gulp task converts scss into css 

gulp.task('sass-handler', async function(){
    return gulp.src('app/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
});


// to compile more than one scss/sass file into css, we need node globs


//globs are matching pattern for files that allow you to add more than one file
//into gulp.src([....]) 
// it's like regex but specifically for file paths.

// 4 common globbing patterns
// *.scss, **/*.scss, !not-me.scss and *.+(scss|sass)


gulp.task('sass-glob', async function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
})

//to automate gulp task, watching is used
// gulp have a watch method : gulp.watch()

// if we want to watch more than one file type at once
// we can group multiple watch processes for such purpose

gulp.task('watch', async function(){
    gulp.watch('app/scss/**/*.scss', gulp.series(['sass-glob']));
})



//LIVE RELOADING WITH BROWSER SYNC (BROWSER AUTO_RELOAD ON FILE SAVE)

// we need to create browser-sync task to enable gulp spin up
// server.

gulp.task('browserSync', async function(){
    browserSync.init({
        server : {
            baseDir : 'dist'
        }
    })
})

gulp.task('sass-auto-reload', async function(){
    gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream : true
    }))
})

//browserSync need to be run before watch-browser
//also sass-auto-reload before watch-browser inorder to keep the latest css
//whenever we run gulp cmd.

gulp.task('watch-browser', gulp.series('browserSync', 'sass-auto-reload', async function(){
    gulp.watch('app/scss/**/*.scss', gulp.series(['sass-auto-reload']));
    gulp.watch('app/*.html', browserSync.reload); 
}))


// to run more than one task, use gulp.series() or gulp.parallel()







