var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');

var src_root = './app';
var dest_root = './dest';
var test_root = './test';
var html_src = src_root + '/html/**/*.html';
var html_dest = dest_root + '/';
var css_src = src_root + '/css/**/*.css';
var css_dest = dest_root + '/style/';
var coffee_src = src_root + '/coffee/**/*.coffee';
var coffee_dest = dest_root + '/js/';
var test_src = test_root + '/**/*.coffee';
var test_dest = test_root + '/dest/';
var test_files = test_dest + '/**/*.js';

gulp.task('default', ['watch'] );

gulp.task('coffee', function() {
  gulp.src(coffee_src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(coffee({bare: true}))//.on('error', gutil.log))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(coffee_dest));
});

gulp.task('html', function() {
  gulp.src(html_src)
    .pipe(gulp.dest(html_dest));
});

gulp.task('css', function() {
  gulp.src(css_src)
    .pipe(gulp.dest(css_dest));
});

gulp.task('watch-web' , ['html', 'css', 'coffee', 'browser-sync'], function() {
  gulp.watch(coffee_src, ['coffee']);
  gulp.watch(html_src, ['html']);
  gulp.watch(css_src, ['css']);
});

gulp.task('browser-sync', function() {
  var files = [
    'dest/**/*'
  ];
  browserSync.init(files, {
    server: {
      baseDir: './dest'
    }
  });
});

gulp.task('coffee-test', function() {
  gulp.src(test_src)
    .pipe(plumber())
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest(test_dest));
});

gulp.task('test', function() {
  gulp.src(test_files, {read: false})
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch-test', ['coffee-test'], function() {
  gulp.watch(test_src, ['coffee-test']);
  gulp.watch(test_files, ['test']);
});

gulp.task('watch', ['watch-web', 'watch-test']);
