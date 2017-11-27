var fs = require('fs');
var chalk = require('chalk');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var minimist = require('minimist');
var builder = require('bingo-builder');
var bingo = new builder({compress : 0});
var argv = minimist(process.argv.slice(2));

function createjs(f){
    if(f.indexOf('.js') == -1) return;
    bingo.build(f, function(err, res){
        if(err) gutil.log('Error:', err);
        else {
            var name = f.split('local')[1].replace('/', '');
            fs.writeFile(f.replace('local', '.min'), res, function(){
                gulp.src(f.replace('local', '.min'))
                    .pipe(uglify())
                    .pipe(gulp.dest('./src/javascript/h5/min'));
                gutil.log(
                    'Builder ',
                    '\'' + chalk.cyan(name) + '\'',
                    '...'
                );
            });
        }
    });
};

function createcss(f){
    var name = f.split('sass')[1].replace('/', '')+'css';
    gulp.src(f)
        .pipe(sass())
        .pipe(minifycss())
        .pipe(gulp.dest('./src/style/h5/css'));
    gutil.log(
        'sass ',
        '\'' + chalk.cyan(name) + '\'',
        '...'
    );
};

//编译sass
gulp.task('sass', function () {
    return gulp.src('./src/style/h5/sass/*.scss')
        .pipe(sass())
        .pipe(minifycss())
        .pipe(gulp.dest('./src/style/h5/css'));


    //return sass('./src/style/h5/sass/*.scss')
    //    .on('error', function (err) {
    //        console.error('Error!', err.message);
    //    })
    //    .pipe(gulp.dest('./src/style/h5/css'))
});

//编译javascript
gulp.task('scripts', function() {
    var dir = './src/javascript/h5/local/';
    fs.exists(dir, function (exists) {
        if (!exists) return;
        var files = fs.readdirSync(dir);
        for(var f in files) {
            createjs(dir+files[f]);
        }
    });
});

//监听文件
gulp.task('watch',['sass', 'scripts'], function() {
    //监听sass文件
    gulp.watch('./src/style/**/*.scss', function(f){
        if(f.path.indexOf('/sass/') > -1) createcss(f.path);
        else gulp.start('sass');
    });

    //监听javascript文件
    gulp.watch('./src/javascript/h5/block/*.js', ['scripts']);
    gulp.watch('./src/javascript/h5/local/*.js', function(f){
        createjs(f.path);
    });
});

//线上发布
gulp.task('publish', ['sass', 'scripts']);

//默认任务
gulp.task('default', function(){
    if(argv.watch){
        gulp.start('watch');
    }
    else if(argv.publish){
        gulp.start('publish');
    }
    else{
        console.log(chalk.cyan('本地开发请加参数 --watch\n线上构建&本地构建请加参数 --publish'));
    }
});
