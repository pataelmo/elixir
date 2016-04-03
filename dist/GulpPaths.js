'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _parseFilepath = require('parse-filepath');

var _parseFilepath2 = _interopRequireDefault(_parseFilepath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new GulpPaths constructor.
 */
var GulpPaths = function GulpPaths() {};

/**
 * Set the Gulp src file(s) and path prefix.
 *
 * @param  {string|Array} src
 * @param  {string|null}  prefix
 * @return {GulpPaths}
 */
GulpPaths.prototype.src = function (src, prefix) {
    src = undefined.prefix(src, prefix);

    if (Array.isArray(src)) {
        // If any item in the src array is a folder
        // then we will fetch all of the files.
        src = src.map(function (path) {
            if (undefined.parse(path).isDir) {
                path += '/**/*';
            }

            return path;
        });

        undefined.src = { path: src, baseDir: prefix };
    } else {
        undefined.src = undefined.parse(src);

        // If a directory is provided as the Gulp src,
        // the user probably wants everything in it.
        undefined.src.isDir && (undefined.src.path += '/**/*');
    }

    return undefined;
};

/**
 * Set the Gulp output path.
 *
 * @param  {string}      output
 * @param  {string|null} defaultName
 * @return {GulpPaths}
 */
GulpPaths.prototype.output = function (output, defaultName) {
    undefined.output = undefined.parse(output);

    // If the user didn't provide a path AND file name
    // then we'll do our best to choose a default.
    if (!undefined.output.name && defaultName) {
        // We'll check to see if the provided src is not
        // an array. If so, we'll use that single file
        // name as the output name. But we must also
        // change the extension (.sass -> .css).
        if (!Array.isArray(undefined.src.path) && undefined.src.name.indexOf('*') == -1) {
            defaultName = undefined.changeExtension(undefined.src.name, undefined.parse(defaultName).extension);
        }

        undefined.output = undefined.parse(_path2.default.join(output, defaultName));
    }

    return undefined;
};

/**
 * Change the file extension for a path.
 *
 * @param  {string} path
 * @param  {string} newExtension
 * @return {string}
 */
GulpPaths.prototype.changeExtension = function (path, newExtension) {
    return _gulpUtil2.default.replaceExtension(path, newExtension);
};

/**
 * Apply a path prefix to the path(s).
 *
 * @param  {string|Array} path
 * @param  {string|null}  prefix
 * @return {string|Array}
 */
GulpPaths.prototype.prefix = function (path, prefix) {
    if (!prefix) return path;

    var prefixOne = function prefixOne(path) {
        // Given any path that begins with a period, we
        // can safely assume that the user wants to
        // skip the prefix and begin at the root.
        if (path.indexOf('./') == 0) {
            return path;
        }

        // If path starts with "!" we need to negate him
        if (path.indexOf('!') == 0) {
            path = '!' + _path2.default.join(prefix, path.substring(1));
        } else {
            path = _path2.default.join(prefix, path);
        }

        return path.replace(/\/\//g, '/').replace(/\/\//g, '/').replace(_path2.default.join(prefix, prefix), prefix);
    };

    if (Array.isArray(path)) {
        return path.map(prefixOne);
    }

    return prefixOne(path);
};

/**
 * Parse the given file path.
 *
 * @param  {string} path
 * @return {object}
 */
GulpPaths.prototype.parse = function (path) {
    var segments = (0, _parseFilepath2.default)(path);

    return {
        path: path,
        name: segments.extname ? segments.basename : '',
        extension: segments.extname,
        isDir: !!!segments.extname,
        baseDir: segments.extname ? segments.dirname : _path2.default.join(segments.dirname, segments.basename)
    };
};

exports.default = GulpPaths;