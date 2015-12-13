'use strict';

var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	autoprefixer = require('gulp-autoprefixer');
	
var path = {
	app: './app'
};
	
gulp.task('connect', function () {
	connect.server({
		root: [ path.app ],
		port: 1337,
		livereload: true
	});
});

gulp.task('html', function () {
	return gulp.src(path.app + '/**/*.html')
		.pipe(connect.reload());
});

gulp.task('sass', function () {
	return gulp.src(path.app + '/style/scss/**/*.scss')
		.pipe(sass()).on('error', sass.logError)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(path.app + '/style/css/'))
		.pipe(connect.reload());
});

gulp.task('jshint', function () {
	return gulp.src(path.app + '/src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch([path.app + '/style/scss/**/*.scss'], ['sass']);
	gulp.watch([path.app + '/**/*.html'], ['html']);
	gulp.watch([path.app + '/src/**/*.js'], ['jshint']);
	
});

gulp.task('serve', ['connect', 'sass', 'jshint', 'watch']);

gulp.task('default', ['serve']);