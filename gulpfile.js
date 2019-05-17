const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gulpSass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect'); 

// gulp.task('default', () =>{
//     console.log("re");
// })

// 制定一个css任务
// scss编译成css， 压缩css

gulp.task('css', () => {
    gulp.src(['src/css/**/*.scss','!src/css/module/*scss'])
        .pipe(gulpSass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
})

//制定html任务
gulp.task('html', () => {
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
            // removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            // minifyJS: true,//压缩页面JS
            // minifyCSS: true//压缩页面CSS 
        }))
        .pipe(gulp.dest('dist'))
            //重启服务器
        .pipe(connect.reload());
})

//制定js任务
gulp.task('js', () => {
    // 把js代码取出来，ES6转成ES5
    // 压缩
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets:  ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
})

//libs任务
gulp.task('libs', () => {
    //libs里面的文件原方不动的移动到dist里面
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))
})

// images任务
gulp.task('images', () => {
    //images里面的文件原方不动的移动到dist里面
    gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'))
})

// 指定一个开启服务器的任务
gulp.task('server', () => {
    connect.server({
        port: 90,
        livereload: true, //支持热更新
        root: "dist"
    })
})


//制定一个监听任务
gulp.task('watch', () => {
    gulp.watch('src/**/*.html', ["html"]);
    gulp.watch('src/css/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
})
    

//任务集中执行
gulp.task('default', ["html", "css", "js", "libs", "images", "server", "watch"])