const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass and Inject Into Browser
gulp.task('sass', () => gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream()));

// Move JS files to src/js
gulp.task('js', () => gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream()));

// Watch Sass and Server
gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Move Fonts folder to src/fonts
gulp.task('fonts', () => gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest('src/fonts')));

// Move Fonts Awesome CSS to src/css
gulp.task('fa', () => gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('src/css')));

// To create a default gulp task
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
