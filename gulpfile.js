var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		pug 					= require('gulp-pug'),
		browserSync 	= require('browser-sync');
		

gulp.task('sass', function () {
	return gulp.src("app/sass/**/*.sass")
	.pipe(sass({     
      includePaths: require('node-bourbon').includePaths
    }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function () {
	return gulp.src("app/pug/**/*.pug")
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app/'))
	.pipe(browserSync.reload({stream: true}))
});	

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync','sass', 'pug'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	// gulp.watch('app/pug/**/*.pug', ['pug']);
});

// gulp.task('default', function() {
// 	gulp.watch('app/sass/**/*.sass', ['sass']);
// })
