var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var ngHtml2Js = require("gulp-ng-html2js");
var header = require('gulp-header');
var fs = require('fs');
var ngAnnotate = require('gulp-ng-annotate');


/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

var sourceFiles = [

  // Make sure module files are handled first
  path.join(sourceDirectory, '/**/*.module.js'),

  // Then add all JavaScript files
  path.join(sourceDirectory, '/**/*.js'),

  path.join(rootDirectory, './tmp/templates.js')
];

gulp.task('html2js', function () {
  return gulp.src('src/component/templates/*.html')
    .pipe(plumber())
    .pipe(ngHtml2Js({
      moduleName: 'dyngo.component.templates',
      prefix: 'templates/'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('build-src', function () {
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(concat('dyngo.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(header(fs.readFileSync('LICENSE_HEADER', 'utf8')))
    .pipe(rename('dyngo.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', function () {
  runSequence('html2js', 'build-src');
});

/**
 * Process
 */
gulp.task('process-all', function (done) {
  runSequence('jshint-src', 'test-src', 'build', done)
});

/**
 * Watch task
 */
gulp.task('watch', function () {

  // Watch JavaScript files
  gulp.watch(sourceFiles, ['process-all']);
});

/**
 * Validate source JavaScript
 */

gulp.task('jshint-src', function () {
  return gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', function () {
  runSequence('process-all', 'watch')
});
