let gulp = require('gulp');
let newer = require('gulp-newer');
let less = require('gulp-less');
let postcss = require('gulp-postcss');
let cssnext = require('postcss-cssnext');
let cleancss = require('gulp-clean-css');
let rename = require('gulp-rename');

let postcssOptions = [cssnext];

// LESS/CSS
gulp.task('css', () => {
   return gulp.src('src/css/*.less')
      .pipe(newer({
         dest:'dist/css',
         ext:'.css',
         extra:'src/css/includes/**/*.less',
      }))
      .pipe(less())
      .pipe(postcss(postcssOptions))
      .pipe(gulp.dest('dist/css'))
      .pipe(cleancss())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/css'))
});

//let uglify = require('gulp-uglify');
let rollup = require('rollup');
let rollupBabel = require('rollup-plugin-babel');
let rollupUglify = require('rollup-plugin-uglify');

// JS ES6
gulp.task('js', () => {
   //return gulp.src(['./src/js/*.es6'])
      //.pipe(newer({
         //dest: 'dist/js',
         //ext: '.min.js',
         //extra: './src/js/**/*.js',
      //}))
      //.pipe(uglify())
      //.pipe(rename({ extname: '.min.js' }))
      //.pipe(gulp.dest('dist/js'))
   return rollup.rollup({
      input: './src/js/index.es6',
      plugins: [
         rollupBabel(),
         rollupUglify(),
      ]
   }).then(bundle => {
      return bundle.write({
         file: './dist/js/index.min.js',
         format: 'umd',
         name: 'main'
      });
   });
});


// Optimization IMG
let imagemin = require('gulp-imagemin');
let mozjpeg = require('imagemin-mozjpeg');
let jpegrecompress = require('imagemin-jpeg-recompress');
let imageminOptions = [
   imagemin.gifsicle({ interlaced: true }),
   imagemin.jpegtran({ progressive: true }),
   imagemin.optipng({ optimizationLevel: 7 }),
   imagemin.svgo({
      plugins: [{
         removeViewBox: true,
         cleanupIDs: true
      }]
   }),
   mozjpeg({ quality: 83, progressive: true }),
   jpegrecompress({
      quality: 'high', target: 83, max: 89,
      loops: 4, progressive: true, strip: true
   }),
];

gulp.task('images', () => {
   return gulp.src(['./src/img/**/*.{png,gif,jpg,svg}'])
      .pipe(newer('src/img'))
      .pipe(imagemin(imageminOptions))
      .on('error', err => {
         console.log('[ERROR] ', + err.message);
         console.log('Skip ', + err.fileName);
      })
      .pipe(gulp.dest('dist/img'));
});


