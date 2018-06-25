import gulp from 'gulp';

const watch = require('gulp-watch');

const getWatch = ()=>{
  gulp.start('copy-markdown');
}
gulp.task('watch:repos', ()=> watch(["./repos/**/*.*"], getWatch));
