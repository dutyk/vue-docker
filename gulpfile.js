"use strict";
var gulp = require('gulp');
//var $ = require('gulp-load-plugins')(); //这个地方可以使用 $.less这种写法 代替 require引入 但是为了代码清晰 还是挨个 require
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var stripDebug = require('gulp-strip-debug');
var stripComments = require('gulp-strip-comments');
var htmlmin = require('gulp-htmlmin');
var jsDoc = require('gulp-jsdoc3');
var sequence = require('gulp-sequence');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var connect = require('gulp-connect');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var webpack = require('gulp-webpack');
var gulpif = require('gulp-if');
//var bower = require('gulp-bower');

var publishPath = 'dist';
var devWebpackPath = 'dist_webpack';

var currentPath = devWebpackPath;
var devMode = true;

/*gulp.task('bower',function(){
    return bower()
        .pipe(gulp.dest('lib/'));
});*/

gulp.task("css",function(cb){
    var cssDestPath = currentPath+'/src/css';
    return gulp.src('app/src/css/*.less')
        .pipe(less())
        .pipe(gulpif(!devMode,cleanCss()))
        .pipe(rev())
        .pipe(gulp.dest(cssDestPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(cssDestPath));
});

gulp.task("js",function(cb){
    var jsDestPath = currentPath+'/src/js';
    return gulp.src('app/src/js/*')
        //.pipe(gulpif(!devMode,stripDebug()))
        .pipe(gulpif(!devMode,stripComments()))
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulpif(!devMode,uglify()))
        .pipe(rev())
        .pipe(gulp.dest(jsDestPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(jsDestPath));
});

gulp.task("lib",function(){
    var libDestPath = currentPath+'/lib';
    gulp.src('bower_components/zepto/zepto.min.js')
        .pipe(gulp.dest(libDestPath));
    gulp.src('bower_components/vue/dist/vue.min.js')
        .pipe(gulp.dest(libDestPath));
    return gulp.src('bower_components/jQuery/dist/jquery.min.js')
        .pipe(gulp.dest(libDestPath));
});

gulp.task("html",function(cb){
    var manifestPath = currentPath+'/**/*.json';
    var htmlDestPath = currentPath+'/';
    return gulp.src([manifestPath,'app/**/*.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'src/css/': 'src/css/',
                'src/js/': 'src/js/'
            }
        }))
        .pipe(gulp.dest(htmlDestPath))
        .pipe(gulpif(devMode,connect.reload()));
});


gulp.task("clean",function(cb){
    var cleanPath = currentPath+'/*';
    return gulp.src(cleanPath)
        .pipe(vinylPaths(del));
});

gulp.task("clean_js",function(cb){
    var cleanPath = currentPath+'/src/js/*';
    return gulp.src(cleanPath)
        .pipe(vinylPaths(del));
});

gulp.task("clean_css",function(cb){
    var cleanPath = currentPath+'/src/css/*';
    return gulp.src(cleanPath)
        .pipe(vinylPaths(del));
});

gulp.task("doc",function(cb){
    var config = require('./app/src/doc/jsdoc.json');
    gulp.src('app/src/js/*')
        .pipe(jsDoc(config,cb));
});

gulp.task('watch_js',function(cb){
    sequence('clean_js','js','html')(cb);
});
gulp.task('watch_css',function(cb){
    sequence('clean_css','css','html')(cb);
});

gulp.task('watch_dev',function(){
    gulp.watch(['app/**/*.html'], ['html']);
    gulp.watch(['app/src/**/*.js'], ['watch_js']);
    gulp.watch(['app/src/**/*.less'], ['watch_css']);
});

gulp.task('server_start',function(){
    connect.server({
        name: 'Dev App',
        root: ['dist_webpack'],
        port: 9990,
        livereload: true
    });
});
gulp.task('open_brower',['serve'],function(){
    require('opn')("http://localhost:9990/index.html");
});


gulp.task("publish",function(cb){
    currentPath =publishPath;
    devMode = false;
    sequence('clean','lib','js','css','html')(cb);
});

gulp.task("publish_webpack",function(cb){
    sequence('clean','lib','js','css','html')(cb);
});

gulp.task('serve',['publish_webpack','server_start','watch_dev']);

gulp.task('default',['open_brower']);