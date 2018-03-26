var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

// START / SASS
gulp.task('sass', function() {
  return gulp.src('css/stylesheet.scss')
    .pipe(sass({
      outputStyle: 'minified',
    }).on('error', sass.logError))
    .pipe(gulp.dest('css'))
});
// END / SASS

// START / BROWSER-SYNC
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});
// END / BROWSER-SYNC

// START / AUTOPREFIX
gulp.task('autoprefixer', function() {
  return gulp.src('css/*.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./css'))
});
// END / AUTOPREFIX

// START / DEFAULT
gulp.task('default', gulp.parallel('browserSync', function() {
  gulp.watch('css/*.scss', gulp.series('sass', 'autoprefixer'));
  gulp.watch('css/*.css').on('change', browserSync.reload);
  gulp.watch('js/*.js').on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
}));
// END / DEFAULT