var gulp 					= require('gulp'),			
		pug 					= require('gulp-pug'),
		plumber 			= require('gulp-plumber'),
		sass 					= require('gulp-sass'),	
		cssToScss  		= require('gulp-css-scss'),
		autoprefixer 	= require('gulp-autoprefixer'),
		compressCSS		= require('gulp-csso'),
		rename 				= require('gulp-rename'),				
		concat				= require('gulp-concat'),
		uglify				= require('gulp-uglifyjs'),
		imagemin 			= require('gulp-imagemin'),
		cache         = require('gulp-cache'),
		filesize			= require('gulp-size'),
		del           = require('del'),		
		gutil         = require('gulp-util'),		
		browserSync 	= require('browser-sync'),
		ftp 					= require('vinyl-ftp');		
		
//-------------------------------------------
// Компилируем Pug в HTML
//-------------------------------------------
gulp.task('pug', () => {
	return gulp.src([
		"app/pug/page/1-main.pug",
		"app/pug/page/2-offer.pug",
		"app/pug/page/3-social.pug",		
		"app/pug/page/4-contact.pug",	
		"app/pug/index.pug",
	])
	.pipe(plumber())
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('dist/'))	
	.pipe(browserSync.reload({stream: true}))
});	

//------------------------------------------
// Компилируем SASS в CSS
// 1. Читаемый вариант
// 2. Переименовываем, добавляем префиксы,
// минифицируем
//------------------------------------------
gulp.task('sass', () => {
	return gulp.src("app/sass/**/*.sass")
	.pipe(sass({     
			outputStyle: 'expand',
      includePaths: require('node-bourbon').includePaths
    }).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(compressCSS()) // Можно отключить для наглядности или тестов
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest('dist/css'))
	.pipe(filesize())		
	.pipe(browserSync.stream()); // Inject
});

//--------------------------------------------
// Минимизируем и конкатинируем .js 
//--------------------------------------------
gulp.task('js', () => {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js',
	])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify())
	.pipe(gulp.dest('dist/js/'))	
	.pipe(browserSync.reload({stream: true}));
});

//--------------------------------------------
// Запускаем сервер 
//--------------------------------------------
gulp.task('browser-sync', () => { 
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'dist' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
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
		parallel: 100,
    maxConnections: 5,
		log:      gutil.log
	} );

	var globs = [ 'dist/**'	];

	return gulp.src( globs, { base: 'dist', buffer: false } )
		// .pipe( conn.newer( 'public_html/' ) ) // only upload newer files
		.pipe( conn.dest( 'public_html/agency' ) );
} );      

//----------------------------------------------
// Очистка директории
//----------------------------------------------
gulp.task('removedist', () => {
	return del.sync([	'dist/*' ]); 
});

//-------------------------------------------
// Компилируем CSS в SCSS
//-------------------------------------------		
gulp.task('cssToScss', () => {
	return gulp.src('app/libs/animate.css/animate.min.css')		
	.pipe(cssToScss())
	.pipe(gulp.dest('app/libs/cssToScss'));
});

//-------------------------------------------
// Копируем шрифты
//-------------------------------------------
gulp.task('copyFont', () => {
	return gulp.src('app/fonts/*')		
	.pipe(gulp.dest('dist/fonts'));
});

//-------------------------------------------	
// Скопировать шрифты в директории dist
// и преобразовать CSS в SCSS
//-------------------------------------------	
gulp.task('beforeTheStart', ['cssToScss', 'copyFont'], () => {
	console.log('Done!');
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
gulp.task('default', ['removedist', 'beforeTheStart', 'imagemin', 'watch']);