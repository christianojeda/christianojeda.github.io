/*================================
	SE DECLARAN LAS VARIABLES
	DE GULP.JS A UTILIZAR
	NOTA: SE AGREGARON TODAS LOS
	PLUGIN AL PACKAGE.JSON POR
	MEDIO DE npm install --save-dev
================================*/
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass	= require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-rimraf'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	sourcemaps = require('gulp-sourcemaps');

// VARIABLES DIRECTORIO
var	targetCss = 'css',
	targetJs = 'js',
	targetFont = 'fonts',
	targetAssets = 'assets';

/*================================
	SE TRANSFORMA DE SASS Y SE
	CONCATENAN TODOS A UN SOLO CSS
================================*/
gulp.task('sass-to-css', ['limpiardev'], function(){
  gulp.src('css/**/*.css')
  	// .pipe(sourcemaps.init({loadMaps: true}))
	// .pipe(sass())
	.pipe(concat('finalcss.css'))
	// .pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('prod/'))
	.pipe(browserSync.stream());
});

/*================================
	SE PASA CONCATENAN LOS JS EN 
	UN SOLO ARCHIVO
================================*/
gulp.task('concat-js', ['limpiardev'], function () {
  gulp.src('js/**/*.js')
  .pipe(concat('finaljs.js'))
  .pipe(gulp.dest('dev/'))
  .pipe(browserSync.stream());
});



/*================================
	SE MINIFICA EL JS EN PROD
================================*/
gulp.task('minjs', ['limpiarprod'], function () {
  gulp.src('js/**/*.js')
  .pipe(concat('finaljs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('prod/'))
});

/*================================
	SE MINIFICA EL CSS EN PROD
================================*/
gulp.task('mincss', ['limpiarprod'], function() {
	gulp.src('css/**/*.css')
		.pipe(minifyCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('prod/'))
});


/*================================
	SE LIMPIA TODO LO DE PRODUCCIÓN
================================*/
gulp.task('limpiarprod', function() {
	gulp.src(['!./js/jquery-3.2.1.js', targetCss + '**/*.css', targetJs + '**/*.js', targetFont + '/*'], {read:false})
	.pipe(clean());
});

gulp.task('limpiardev', function() {
	gulp.src(['prod/**/*'], {read:false})
	.pipe(clean());
});


/*================================
	SE INICIA WATCH Y BROWSER-SYNC
	PARA VER CAMBIOS EN VIVO AMEKE
================================*/
gulp.task('watch', ['connect'], function() {
	gulp.watch('assets/**/*.scss', ['sass-to-css']);
	gulp.watch('assets/js/**/*.js', ['concat-js']);
});


gulp.task('connect', function() {
	browserSync({
		proxy: "localhost:8888/induccion-php",
		files: ["**/*.php"]
	});
});

/*================================
	SE INICIA EL MODO DEVELOPER
================================*/
gulp.task('dev', ['sass-to-css', 'concat-js', 'watch']);


/*================================
	SE INICIA EL MODO PRODUCCIÓN
================================*/
gulp.task('prod', ['minjs', 'mincss', 'watch']);


