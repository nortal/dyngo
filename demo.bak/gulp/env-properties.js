'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');
var replace = require('gulp-replace-task');
var gutil = require('gulp-util');

gulp.task('replace-env-properties', function() {
  var env;

  function fileExists(file) {
    try {
      var stat = fs.statSync(file);
      return stat.isFile()
    } catch (err) {
      return false;
    }
  }

  if (fileExists('properties.json')) {
    var propeties = fs.readFileSync('properties.json', "utf-8");
    env = JSON.parse(propeties).env;
  }
  if (env === undefined) {
    env = 'local'; // conf for 'local' environment should always exist
  }

  gutil.log('Will replace properties for \'' + gutil.colors.cyan(env) + '\' environment configuration.');

  var envPropertiesFile = 'env/' + env + '.json';
  if (!fileExists(envPropertiesFile)) {
    gutil.log(gutil.colors.red('File \'' + envPropertiesFile + '\' does not exist!'));
    process.exit(1);
  }

  gulp.src('src/app/index.constants.js.template')
    .pipe(concat('src/app/index.constants.js'))
    .pipe(replace({
      patterns: [
        {
          json: JSON.parse(fs.readFileSync(envPropertiesFile, "utf-8"))
        }
      ]
    }))
    .pipe(gulp.dest('.'));
});
