const gulp = require("gulp");
const rimraf = require("rimraf");
const gulpPrefixer = require("./gulpplugs/gulpPrefixer");
const gulpEndfixer = require("./gulpplugs/gulpEndfixer");

// build 要等 build-with-es 完成后才执行
gulp.task("build", ["build-with-es"], () => {
  console.log("build");
  rimraf.sync("dist");
  rimraf.sync("dist1");
  gulp
    .src("src/*.js", { buffer: false })
    .pipe(gulpPrefixer("/*代码开始*/\n"))
    .pipe(gulpEndfixer("\n/*代码结束*/"))
    .pipe(gulp.dest("dist"));
});

gulp.task("build-with-es", done => {
  console.log("build-with-es");
  done();
});

// default 要等 build-with-es 与 build 完成后才执行
gulp.task("default", ["build-with-es", "build"], () => {
  console.log("完成");
});

// // 监视文件变化时自动build
// gulp.watch(["./src/*.js"], ["build"]).on("change", event => {
//   console.log(event.path + ", changed");
// });
