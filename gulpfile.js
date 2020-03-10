/*librerias requeridas para gulp*/
let gulp 		= require('gulp');
let gulp_postcss= require('gulp-postcss');
/*librerias de postcss*/
let colorFunction 	= require('postcss-color-function');
let extend			= require('postcss-extend');
let imports			= require('postcss-import');
let math 			= require('postcss-math');
let mixins			= require('postcss-mixins');
let nested			= require('postcss-nested');
let varibles		= require('postcss-advanced-variables');
/*librerias fuera de postcss*/
let autoprefixer 	= require('autoprefixer');
/*rutas*/
let input	= 'postcss/';
let output	= 'css';

function makeACompilator(){
	let pluggins = new Array();
	pluggins =  [
					imports(),
					mixins(),
					varibles(),
					nested(),
					extend(),
					colorFunction({preserveCustomProps:true}),
					math(),
					autoprefixer()
			   ];

	let compilation = gulp.src(input+'*.css')
							.pipe(gulp_postcss(pluggins))
							.pipe(gulp.dest(output));
	
	return compilation;
}

gulp.task(
			'compile', 
			gulp.series(
						function(){
							return makeACompilator();
						}));
gulp.task('watch', function() {
	console.log('-------------------------0-------------------------');
  	gulp.watch(input+'**/*.scss', gulp.task('compile'));
  	console.log('-------------------------0-------------------------');
});
