var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		pug 					= require('gulp-pug'),
		browserSync 	= require('browser-sync'),
		concat				= require('gulp-concat'),
		uglify				= require('gulp-uglifyjs'),

		filesize			= require('gulp-size'),
		compressCSS		= require('gulp-csso');
		

gulp.task('sass', function () {
	return gulp.src("app/sass/**/*.sass")
	.pipe(sass({     
			// outputStyle: 'expand',
      includePaths: require('node-bourbon').includePaths
    }).on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
	
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function () {
	return gulp.src("app/pug/index.pug")
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app/'))
	
	.pipe(browserSync.reload({stream: true}))
});	

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js',
	])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/'))
	
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['sass', 'pug', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/js/**/*.js', ['js']);
});

gulp.task('default', ['watch']);
