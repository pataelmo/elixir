'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _arguments = arguments;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Elixir is a wrapper around Gulp.
 *
 * @param {Function} recipe
 */
var Elixir = function Elixir(recipe) {
    require('require-dir')('./tasks');

    // Load the user's Gulpfile recipe.
    recipe(Elixir.mixins);

    // And initialize their chosen tasks.
    Elixir.tasks.forEach(function (task) {
        task.toGulp();
    });
};

Elixir.mixins = {};
Elixir.Log = require('./Logger');
Elixir.GulpPaths = require('./GulpPaths');
Elixir.config = require('./Config');
Elixir.Plugins = require('gulp-load-plugins')();
Elixir.Task = require('./Task')(Elixir);
Elixir.tasks = new (require('./TaskCollection'))();

Elixir.Notification = require('./Notification');
process.env.DISABLE_NOTIFIER = Elixir.config.notifications;

/**
 * Register a new task with Elixir.
 *
 * @param {string}   name
 * @param {Function} callback
 */
Elixir.extend = function (name, callback) {
    Elixir.mixins[name] = function () {
        callback.apply(undefined, _arguments);

        return undefined.mixins;
    };
};

/**
 * Allow for config overrides, via an elixir.json file.
 *
 * @param {string} file
 */
Elixir.setDefaultsFrom = function (file) {
    var overrides = void 0;

    if (_fs2.default.existsSync(file)) {
        overrides = JSON.parse(_fs2.default.readFileSync(file, 'utf8'));

        _underscore2.default.mixin({
            deepExtend: require('underscore-deep-extend')(_underscore2.default)
        });

        _underscore2.default.deepExtend(Elixir.config, overrides);
    }
}('elixir.json');

exports.default = Elixir;