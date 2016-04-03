import fs from 'fs';
import _ from 'underscore';

/**
 * Elixir is a wrapper around Gulp.
 *
 * @param {Function} recipe
 */
const Elixir = (recipe) => {
    require('require-dir')('./tasks');

    // Load the user's Gulpfile recipe.
    recipe(Elixir.mixins);

    // And initialize their chosen tasks.
    Elixir.tasks.forEach(task => {
        task.toGulp();
    });
};

Elixir.mixins       = {};
Elixir.Log          = require('./Logger');
Elixir.GulpPaths    = require('./GulpPaths');
Elixir.config       = require('./Config');
Elixir.Plugins      = require('gulp-load-plugins')();
Elixir.Task         = require('./Task')(Elixir);
Elixir.tasks        = new (require('./TaskCollection'))();

Elixir.Notification = require('./Notification');
process.env.DISABLE_NOTIFIER = Elixir.config.notifications;

/**
 * Register a new task with Elixir.
 *
 * @param {string}   name
 * @param {Function} callback
 */
Elixir.extend = (name, callback) => {
    Elixir.mixins[name] = () => {
        callback.apply(this, arguments);

        return this.mixins;
    };
};

/**
 * Allow for config overrides, via an elixir.json file.
 *
 * @param {string} file
 */
Elixir.setDefaultsFrom = (file => {
    let overrides;

    if (fs.existsSync(file)) {
        overrides = JSON.parse(fs.readFileSync(file, 'utf8'));

        _.mixin({
            deepExtend: require('underscore-deep-extend')(_)
        });

        _.deepExtend(Elixir.config, overrides);
    }
})('elixir.json');


export default Elixir;
