GLOBAL.gulp = require('gulp');
GLOBAL.parse = require('parse-filepath');

/**
 * Elixir is a wrapper around Gulp.
 *
 * @param {Function} recipe
 */
GLOBAL.Elixir = recipe => {
    // 1. Perform any last-minute initialization.
    init();

    // 2. Load all available Elixir tasks.
    require('require-dir')('./tasks');

    // 3. Process the user's Gulpfile recipe.
    recipe(Elixir.mixins);

    // 4. Generate the necessary Gulp tasks.
    Elixir.tasks.forEach(task => task.toGulp());
};


[
    './bootstrap/SetDependencies',
    './bootstrap/EnableExtension',
    './bootstrap/SetHooks',
    './bootstrap/ConfigureWebpack',
    './bootstrap/SetDefaults'
]
.forEach(bootstrapper => require(bootstrapper));


/**
 * Perform any last-minute initializations.
 */
function init() {
    if (! Elixir.config.notifications) {
        process.env.DISABLE_NOTIFIER = true;
    }

    Elixir.Notification = require('./Notification').default;
};

module.exports = Elixir;
