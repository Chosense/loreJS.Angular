/// <binding BeforeBuild='beforeBuild' AfterBuild='afterBuild' Clean='clean' />
"use strict";

var gulp = require("gulp");
var del = require("del");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("clean:js", function () {
    return del("./wwwroot/js");
});

gulp.task("clean:css", function (cb) {
    return del("./wwwroot/css");
});
gulp.task("clean:dist", function (cb) {
    return del("../../dist/**/*", { force: true });
});

gulp.task("clean", ["clean:js", "clean:css", "clean:dist"]);

gulp.task("del:min:js", function () {
    return del("./wwwroot/js/loreJS.Angular/*.min.js");
});

gulp.task("min:js", function (cb) {

    gulp.src("./wwwroot/js/loreJS.Angular/*.js")
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

    gulp.src("./Scripts/*.d.ts")
        .pipe(gulp.dest("../../dist/js/"));
});

gulp.task("beforeBuild", ["copy:loreJS", "del:min:js", "clean:dist"]);

gulp.task("afterBuild", ["min", "copy:dist"]);