var gulp = require('gulp');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

require('babel-core/register');

var src_root = 'src';
var dest_root = 'lib';
var test_root = 'test';
var coffee_src = src_root + '/**/*.coffee';
var coffee_dest = dest_root + '/';
var test_src = test_root + '/**/*.js';
var lib_src = dest_root + '/**/*.js';

gulp.task('default', ['watch'] );

gulp.task('test', function() {
  gulp.src(test_src, {read: false})
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('watch', ['test'], function() {
  watch([test_src, lib_src], batch(function(e, done) {
    gulp.start('test', done);
  }));
});
