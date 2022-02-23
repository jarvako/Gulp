global.$ = {
    gulp: require("gulp"),
    gp: require('gulp-load-plugins')(),
    browserSync: require("browser-sync").create(),
    path: require('./config/path.js'),
    app: require('./config/app.js')
}


const requireDir = require('require-dir')
const task = requireDir("./task", {recurse: true})


const watcher = () => {
    $.gulp.watch($.path.pug.watch, task.pug).on("all", $.browserSync.reload)
    $.gulp.watch($.path.scss.watch, task.scss).on("all", $.browserSync.reload)
    $.gulp.watch($.path.js.watch, task.js).on("all", $.browserSync.reload)
    $.gulp.watch($.path.img.watch, task.img).on("all", $.browserSync.reload)
    $.gulp.watch($.path.font.watch, task.font).on("all", $.browserSync.reload)
}

const build = $.gulp.series(
    task.clear,
    $.gulp.parallel(task.pug, task.scss, task.js, task.img, task.font)
);

const dev = $.gulp.series(
    build,
    $.gulp.parallel(watcher, task.server)
); 

exports.pug = task.pug;
exports.scss = task.scss;
exports.js = task.js;
exports.img = task.img
exports.font = task.font



exports.default = $.app.isProd
    ? build
    : dev;