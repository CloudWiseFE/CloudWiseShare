var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var cssimport = require('gulp-cssimport');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');

var pkg = require('./package.json');

/*
 * html
 */
gulp.task('clean_html', function () {
    return gulp.src('app/pages')
        .pipe(clean({force: true}));
});
gulp.task('html', ['clean_html'], function () {
    gulp.src(['src/pages/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            context: {
                main_title: pkg.name,
                main_keywords: pkg.keywords.join(','),
                main_description: pkg.description,
                main_author: pkg.author.join(','),
                page: null
            }
        }))
        .pipe(gulp.dest('app/pages/'));
});

/*
 * css
 */
gulp.task('clean_css', function () {
    return gulp.src('app/css')
        .pipe(clean({force: true}));
});
gulp.task('css', ['clean_css'], function () {
    gulp.src('src/css/app.css')
        .pipe(cssimport({}))
        .pipe(gulp.dest('app/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest("app/css/"));
});

/*
 * watch
 */
gulp.task('watch', function () {
    // 监听html模板
    gulp.watch(['src/pages/**/*.html'], ['html'])
        .on('change', function (event) {
            console.log('html模板文件改变！');
        });
    // 监听css文件
    gulp.watch(['src/css/**/*.css'], ['css'])
        .on('change', function (event) {
            console.log('css文件改变！');
        });
});

gulp.task('build', ['css', 'html'], function () {
    console.log('build done!');
});