const gulp = require('gulp');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const imgmin = require('gulp-imagemin');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');
const util = require('gulp-util');
const sequence = require('gulp4-run-sequence');
const browserSync = require('browser-sync').create();


gulp.task('arqCSS', ()=>{
    return gulp.src('ccs/style.css')
        .pipe(uglifycss())
        .pipe(gulp.dest('./luxury-website-min/ccs'))
});

gulp.task('arqHTML', ()=>{
    return gulp.src('*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./luxury-website-min'))
});

gulp.task('arqJS', ['arqJS2', 'arqJS3'], ()=>{
    return gulp.src(['view/**.js', 'index.js'])
        .pipe(babel({
            minified: true,
            comments: true,
            presets: ['env']
        }))
        .pipe(gulp.dest('./luxury-website-min/view'))
});

gulp.task('arqJS2',()=>{
    return gulp.src('models/**.js')
        .pipe(babel({
            minified: true,
            comments: true,
            presets: ['env']
        }))
        .pipe(gulp.dest('./luxury-website-min/models'))
});

gulp.task('arqJS3', ()=>{
    return gulp.src('index.js')
        .pipe(babel({
            minified: true,
            comments: true,
            presets: ['env']
        }))
        .pipe(gulp.dest('./luxury-website-min'))
});

gulp.task('arqIMG', ()=>{
    return gulp.src(['img/*.*', 'img/**/*.*'])
        .pipe(imgmin())
        .pipe(gulp.dest('./luxury-website-min/img'))
});

gulp.task('app', ['arqCSS', 'arqHTML', 'arqJS', 'arqIMG'])

gulp.task('default', ()=>{

    if(util.env.production){
        //sequence('app')
        gulp.start('app')
    }else{
        //sequence('app', 'servidor')
        gulp.start('app', 'servidor')
    }
});

gulp.task('monitorarMudancas', ()=>{
    watch('ccs/style.css', ()=> gulp.start('arqCSS'))
    watch('*.html', () => gulp.start('arqHTML'));
    watch(['view/**.js', 'models/**.js'], 'index.js', ()=> gulp.start('arqJS'))
    watch(['img/*.*', 'img/**/*.*'], ()=> gulp.start('arqIMG'))
    
})

gulp.task('servidor', ['app','monitorarMudancas'], ()=>{
    return gulp.src('luxury-website-min').pipe(webserver({
        livereload: true,
        port: 8080,
        open: true
    }))
})