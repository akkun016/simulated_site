const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');
const browserSync = require('browser-sync').create();

function copyIndex() {
  return src('src/*.html')
    .pipe(dest('dest'));
}

// scssのコンパイル
function cssSass() {
  return src('src/sass/*.scss')
  .pipe(sass({ outputStyle: "expanded" }))
  .on('error', sass.logError)
  .pipe(dest('dest/css'))
  .pipe(browserSync.stream());
}

// jsトランスパイル
function Babel() {
  return src('src/*.js')
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(dest('dest/js'));
}

// ファイル監視処理 + ローカルホストサーバー自動更新
function watchFile() {

  browserSync.init({
    server: {
      baseDir: "./dest"
    }
  });

  watch('src/*index.html', copyIndex);
  watch('src/sass/*.scss', cssSass);
  watch('src/*.js', Babel);
  watch("dest/*.html").on('change', browserSync.reload);
}

// ローカルホストにてサーバー立ち上げ
function webServer() {
  return src('dest')
  .pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: true
  }));
}

exports.default = parallel(watchFile, webServer);