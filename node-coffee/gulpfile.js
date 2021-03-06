var gulp = require('gulp');
var coffee = require('gulp-coffee');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

require('coffee-script/register');

var src_root = 'src';
var dest_root = 'lib';
var test_root = 'test';
var coffee_src = src_root + '/**/*.coffee';
var coffee_dest = dest_root + '/';
var test_src = test_root + '/**/*.coffee';
var lib_src = dest_root + '/**/*.js';

gulp.task('default', ['watch'] );

gulp.task('build', function() {
  gulp.src(coffee_src)
    .pipe(plumber())
    .pipe(watch(coffee_src))
    .pipe(coffee({bare: true}))//.on('error', gutil.log))
    .pipe(gulp.dest(coffee_dest));
});

// gulp.task('coffee-test', function() {
//   gulp.src(test_src)
//     .pipe(plumber())
//     .pipe(coffee({bare: true}))
//     .pipe(gulp.dest(test_dest));
// });

gulp.task('test', function() {
  gulp.src(test_src, {read: false})
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('watch', ['build'], function() {
  watch(coffee_src, ['build']);
  watch([test_src, lib_src], batch(function(e, done) {
    gulp.start('test', done);
  }));
});
