//引入模块
const gulp = require("gulp"),
	minifyCss = require("gulp-clean-css"),
	babel = require("gulp-babel"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass");
//定制任務:压缩css
gulp.task("css",function(){
	gulp.src("./src/**/*.css")
		.pipe(minifyCss())
		.pipe(gulp.dest("./dist/"));
});

//压缩js
gulp.task("js",function(){
	gulp.src("./src/js/**/*.js")
		.pipe(babel({
			presets:['env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js/"));
});
//编译sass
gulp.task("sass",function(){
	gulp.src("./src/sass/*.scss")
		.pipe(sass({outputStyle:"compact"}))
		.pipe(gulp.dest("./dist/css/"));
});