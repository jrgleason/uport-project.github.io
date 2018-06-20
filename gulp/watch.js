import gulp from 'gulp';

const watch = require('gulp-watch');

gulp.task('watch:repos', () => watch(["./repos/**/*.*"], () => {
    gulp.start('copy-markdown');
}));
