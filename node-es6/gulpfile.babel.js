import gulp from 'gulp';
import plumber from 'gulp-plumber';
import mocha from 'gulp-mocha';
import watch from 'gulp-watch';
import batch from 'gulp-batch';
import babel from 'gulp-babel';

require('babel-core/register');

let src_root = 'src';
let dest_root = 'lib';
let test_root = 'test';
let es6_src = src_root + '/**/*.js';
let es6_dest = dest_root + '/';
let test_src = test_root + '/**/*.js';
let lib_src = dest_root + '/**/*.js';

gulp.task('default', ['watch'] );

gulp.task('build', () => {
  return gulp.src(es6_src)
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(es6_dest));
});

gulp.task('test', () => {
  gulp.src(test_src, {read: false})
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('watch', ['build'], () => {
  watch(es6_src, () => {
    gulp.start('build');
  });
  watch([test_src, lib_src], batch((e, done) => {
    gulp.start('test', done);
  }));
});
