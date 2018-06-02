var gulp = require('gulp'),
  sass = require('gulp-sass'),
  nano = require('gulp-cssnano'),
  argv = require('yargs').argv,
  gulpif = require('gulp-if');


gulp.task('default', function () {
  gulp.src('scss/styles.scss')
    .pipe(sass())
    .pipe(gulpif(argv.production, nano()))
    .pipe(gulp.dest('www/css'));
});