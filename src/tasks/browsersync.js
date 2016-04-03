import Elixir from 'laravel-elixir';

let _;
let gutils;
let browserSync;
const config = Elixir.config;


/*
 |----------------------------------------------------------------
 | BrowserSync
 |----------------------------------------------------------------
 |
 | Browsersync makes your browser testing workflow faster by
 | synchronizing URLs, behavior, and code changes across
 | across multiple devices. And, now it's in Elixir!
 |
 */

Elixir.extend('browserSync', options => {
    loadPlugins();

    options = _.extend({
        files: [
            `${config.appPath}/**/*.php`,
            `${config.get('public.css.outputFolder')}/**/*.css`,
            `${config.get('public.js.outputFolder')}/**/*.js`,
            `${config.get('public.versioning.buildFolder')}/rev-manifest.json`,
            `${config.viewPath}/**/*.php`
        ],
        watchOptions: {
            usePolling: true
        },
        snippetOptions: {
            rule: {
                match: /(<\/body>|<\/pre>)/i,
                fn(snippet, match) {
                    return snippet + match;
                }
            }
        }
    }, config.browserSync, options);

    // Browsersync will only run during `gulp watch`.
    if (gutils.env._.indexOf('watch') > -1) {
        browserSync.init(options);
    }

    new Elixir.Task('browserSync', () => {}).watch();
});


/**
 * Load the required Gulp plugins on demand.
 */
let loadPlugins = () => {
    _ = require('underscore');
    gutils = require('gulp-util');
    browserSync = require('browser-sync').create();
};
