var http = require('http');
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require("gulp-livereload");
var nodemon = require('gulp-nodemon');
var gutil = require("gulp-util");
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

gulp.task("webpack", function(callback) {

    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });

});

gulp.task('server', function() {
  nodemon({
    script: './server/server.js'
  , ext: 'js jsx html'
  , ignore : ['app/', 'public/']
  , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('js', function () {
  gulp.src('./public/build/*.js')
  .pipe(livereload())
});

gulp.task('jsx', function () {
  livereload();
});

gulp.task('css', function () {
  gulp.src('./public/css/*.css')
  .pipe(livereload());
});

gulp.task('html', function () {
  gulp.src([
  	'*.html',
  	'./views/*.html'
  ])
  .pipe(livereload());
});

gulp.task('sass', function () {
  gulp.src('./app/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/css'))
  .pipe(livereload());
});

gulp.task('watch', function () {

  livereload.listen();

	// HTML
  gulp.watch([
  	'*.html',
  	'./views/*.html'
  ], ['html']);

	// CSS
  //gulp.watch([
  //'./public/css/*.css'
  //], ['css']);

	// JS
  gulp.watch([
   './public/build/*.js'
  ], ['js']);

  gulp.watch([
     './app/*/*.jsx'
   ], ['jsx']);

  // LESS
  gulp.watch([
    './app/styles/*.scss'
  ], ['sass']);

  //gulp.watch(['less/variables.less'],
  //['custom-bootstrap']);

});

//gulp.task('custom-bootstrap', ['bootstrap:prepareLess', 'bootstrap:compileLess', 'minify-custom-bootstrap-css'])
gulp.task('default', ['webpack', 'watch', 'sass', 'server']);
