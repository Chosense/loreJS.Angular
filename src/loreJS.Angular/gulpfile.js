/// <binding BeforeBuild='beforeBuild' AfterBuild='afterBuild' Clean='clean' />
"use strict";

var gulp = require("gulp");
var rimraf = require("rimraf");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("clean:js", function (cb) {
    rimraf("./wwwroot/js/", cb);
});

gulp.task("clean:css", function (cb) {
    rimraf("./wwwroot/css/", cb);
});
gulp.task("clean:dist", function (cb) {
    rimraf("../../dist/js/", cb);
});

gulp.task("clean", ["clean:js", "clean:css", "clean:dist"]);

gulp.task("min:js", function (cb) {
    rimraf(".//wwwroot/js/loreJS.Angular/*.min.js", cb);

    gulp.src(".//wwwroot/js/loreJS.Angular/*.js")
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest(".//wwwroot/js/loreJS.Angular/"))
        .pipe(gulp.dest("../../dist/js/"));
});
gulp.task("min", ["min:js"]);


gulp.task("copy:loreJS", function () {

    gulp.src("../../external/loreJS/dist/js/*.js")
        .pipe(gulp.dest("./wwwroot/js/loreJS/"));

    gulp.src("../../external/loreJS/dist/js/*.d.ts")
        .pipe(gulp.dest("./Scripts/typings/loreJS/"));
});

gulp.task("copy:dist", function () {
    gulp.src("./wwwroot/js/loreJS.Angular/*.js")
        .pipe(gulp.dest("../../dist/js/"))
});

gulp.task("beforeBuild", ["copy:loreJS"]);

gulp.task("afterBuild", ["min", "copy:dist"]);