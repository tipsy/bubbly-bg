const babel = require('gulp-babel');
const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');

gulp.task('javascript', () => {
    del('dist').then(() => gulp.src('src/bubbly-bg.js')
        .pipe(plumber())
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('docs'))
    );
});

gulp.task('watch', () => {
    gulp.watch('src/bubbly-bg.js', ['javascript']);
});

gulp.task('default', ['javascript']);
