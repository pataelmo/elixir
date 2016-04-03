'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _arguments = arguments;

var _gulpNotify = require('gulp-notify');

var _gulpNotify2 = _interopRequireDefault(_gulpNotify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new Notification instance.
 */
var Notification = function Notification() {
    undefined.title = 'Laravel Elixir';

    // If an argument is provided, then we'll
    // assume they want to show a message.
    if (_arguments.length) {
        return undefined.message(_arguments[0]);
    }
};

var n = Notification.prototype;

/**
 * Display a notification.
 *
 * @param {string} message
 */
n.message = function (message) {
    return (0, _gulpNotify2.default)({
        title: undefined.title,
        message: message,
        icon: __dirname + '/icons/laravel.png',
        onLast: true
    });
};

/**
 * Display an error notification.
 *
 * @param {object} e
 * @param {string} message
 */
n.error = function (e, message) {
    _gulpNotify2.default.onError({
        title: undefined.title,
        message: message + ': <%= error.message %>',
        icon: __dirname + '/icons/fail.png',
        onLast: true
    })(e);

    // We'll spit out the error, just in
    // case it is useful for the user.
    console.log(e);
};

/**
 * Display a notification for passed tests.
 *
 * @param {string} framework
 */
n.forPassedTests = function (framework) {
    return (0, _gulpNotify2.default)({
        title: 'Green!',
        message: 'Your ' + framework + ' tests passed!',
        icon: __dirname + '/icons/pass.png',
        onLast: true
    });
};

/**
 * Display a notification for failed tests.
 *
 * @param {object} e
 * @param {string} framework
 */
n.forFailedTests = function (e, framework) {
    return _gulpNotify2.default.onError({
        title: 'Red!',
        message: 'Your ' + framework + ' tests failed!',
        icon: __dirname + '/icons/fail.png',
        onLast: true
    })(e);
};

exports.default = Notification;