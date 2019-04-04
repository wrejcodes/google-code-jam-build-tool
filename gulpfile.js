const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const minify = require('gulp-babel-minify');


gulp.task('build', () => {
  return gulp.src(`./${process.argv[process.argv.indexOf('--src') + 1]}/src/*.js`)
    .pipe(babel({
      presets: [['@babel/preset-env', {targets: {node: '4.8.2'}}]]
    }))
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`./${process.argv[process.argv.indexOf('--src') + 1]}/dist`));
});
