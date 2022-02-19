const {src, dest, parallel, series, watch} = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const del = require('del')

function browsersync() {
    browserSync.init({
        server: {baseDir: 'app'},
        notify: false
    })
}

function images() {
    return src('app/images/**/*')
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
            .pipe(dest('dist/images'))
}

function styles() {
    return src('app/scss/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(concat('style.min.css'))
            .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
            .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
            .pipe(dest('app/css'))
            .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function watching() {
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/js/**/*.js', '!app/**/*.min.js'], scripts)
    watch('app/**/*.html').on('change', browserSync.reload)
}

function buildCopy() {
    return src([
        'app/css/style.min.css',
        'app/js/**/*.min.js',
        'app/images/dest/**/*',
        'app/**/*.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function clearAll() {
    return del('dist/**/*', {force: true})
}

exports.browsersync = browsersync
exports.watching = watching
exports.styles = styles
exports.scripts = scripts
exports.images = images
exports.buildCopy = buildCopy
exports.clearAll = clearAll

exports.build = series(clearAll, styles, images, scripts, buildCopy)
exports.default = parallel(styles, scripts, browsersync, watching)