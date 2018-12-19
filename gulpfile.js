var 
		// Gulp
		gulp 					= require('gulp'),
		// Gulp plugins		
		pug 					= require('gulp-pug'),

		sass 					= require('gulp-sass'),	
		cssScss 			= require('gulp-css-scss'),
		autoprefixer 	= require('gulp-autoprefixer'),
		compressCSS		= require('gulp-csso'),
		rename 				= require('gulp-rename'),		
		
		concat				= require('gulp-concat'),
		uglify				= require('gulp-uglifyjs'),

		imagemin 			= require('gulp-imagemin'),
		cache         = require('gulp-cache'),
		filesize			= require('gulp-size'),
		del           = require('del'),		

		browserSync 	= require('browser-sync'),
		ftp 					= require('vinyl-ftp');		
		
//-------------------------------------------
// Компилируем CSS в SCSS
//-------------------------------------------		
gulp.task('css-scss', () => {
  return gulp.src('app/libs/animate.css/animate.min.css')
    .pipe(cssScss())
    .pipe(gulp.dest('app/libs/animate.css/'));
});

//------------------------------------------
// Компилируем SASS в CSS
// 1. Читаемый вариант
// 2. Переименовываем, добавляем префиксы,
// минифицируем
//------------------------------------------
gulp.task('sass', ['css-scss'], () => {
	return gulp.src("app/sass/**/*.sass")
	.pipe(sass({     
			outputStyle: 'expand',
      includePaths: require('node-bourbon').includePaths
    }).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(compressCSS()) // Можно отключить для наглядности или тестов
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest('app/css'))
	.pipe(filesize())		
	.pipe(browserSync.reload({stream: true}))
});

//-------------------------------------------
// Компилируем Pug в HTML
//-------------------------------------------
gulp.task('pug', () => {
	return gulp.src([
		"app/pug/index.pug",
		"app/pug/page/offer.pug",
		"app/pug/page/social.pug",
		"app/pug/page/main.pug",
		"app/pug/page/contact.pug",		
	])
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app/'))	
	.pipe(browserSync.reload({stream: true}))
});	

//--------------------------------------------
// Минимизируем наш common.js 
//--------------------------------------------
gulp.task('js', () => {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js',
	])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js/'))	
	.pipe(browserSync.reload({stream: true}));
});

//--------------------------------------------
// Запускаем сервер 
//--------------------------------------------
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

//----------------------------------------------
// Оптимизация, минификация изображений
//----------------------------------------------
gulp.task('imagemin', () =>
	gulp.src('app/img/**/*')	
		.pipe(cache(imagemin()) // Cache Images
		.pipe(gulp.dest('dist/img/'))
));

//----------------------------------------------
// Очистка директории
//----------------------------------------------
gulp.task('removedist', () => {
	return del.sync('dist'); 
});

//----------------------------------------------
// Сборка проекта
//----------------------------------------------
gulp.task('build', ['removedist', 'imagemin', 'pug', 'sass', 'js'], () => {

	var buildFiles = gulp.src([
		'app/*.html',		
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));	

	// var buildFonts = gulp.src([
	// 	'app/fonts/**/*',
	// 	]).pipe(gulp.dest('dist/fonts'));

});

//---------------------------------------------
// Vynil-FTP. Деплой на сервер
//---------------------------------------------
gulp.task( 'deploy', () => {

	var conn = ftp.create( {
		host:     'files.000webhost.com',
		port:     '21',
		user:     'plotnik-webdev',
		password: '',
		parallel: 1,
    maxConnections:1,
		// log:      gutil.log
	} );

	var globs = [
		'dist/**'
	];

	return gulp.src( globs, { base: '.', buffer: false } )
		.pipe( conn.newer( 'public_html/' ) ) // only upload newer files
		.pipe( conn.dest( 'public_html/' ) );
} );      

//----------------------------------------------
// Наблюдаем за изменениями, компилируем, перезагружаем
//----------------------------------------------
gulp.task('watch', ['sass', 'pug', 'js', 'browser-sync'], () => {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/js/common.js', ['js']);
});

//----------------------------------------------
// По умолчанию (при запуске)
//----------------------------------------------
gulp.task('default', ['imagemin', 'watch']);