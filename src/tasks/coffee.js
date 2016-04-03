import gulp from 'gulp';
import Elixir from 'laravel-elixir';

const $ = Elixir.Plugins;
const config = Elixir.config;

/*
 |----------------------------------------------------------------
 | CoffeeScript Compilation
 |----------------------------------------------------------------
 |
 | This task will compile your CoffeeScript, minify it, and then
 | optionally generate a "manifest" file that helps with your
 | browser cache-busting of previous versions of your code.
 |
 */

Elixir.extend('coffee', (src, output, options) => {
    const paths = prepGulpPaths(src, output);

    new Elixir.Task('coffee', () => {
        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
            .pipe($.coffee(options || config.js.coffee.options)
                .on('error', (e) => {
                    new Elixir.Notification().error(e, 'CoffeeScript Compilation Failed!');

                    this.emit('end');
                }))
            .pipe($.concat(paths.output.name))
            .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
            .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('CoffeeScript Compiled!'))
        );
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
let prepGulpPaths = (src, output) => {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.js.coffee.folder'))
        .output(output || config.get('public.js.outputFolder'), 'app.js');
};
