/**
 * Common utilities function for nodejs.
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 * Licensed under the MIT license.
 */
(function(require, exports, module) {
'use strict';

function _mix(r, s, deep, force) {
    for (var k in s) if (s.hasOwnProperty(k)) {
        if (s[k] && r[k] && deep && typeof s[k] === 'object') {
            _mix(r[k], s[k], deep, force);
        } else {
            if (r[k] === undefined || force) {
                r[k] = s[k];
            }
        }
    }
    return r;
}

var slice = [].slice,
    nativeUtil = require('util'),

    isBoolean = function(o) {
        return typeof o === 'boolean';
    },

    mix = function(o, s, deep, force) {
        var args = slice.call(arguments, 1), l = args.length, t;

        if (l && isBoolean(t = args[l - 1])) {
            force = t; --l;
        }
        if (l && isBoolean(t = args[l - 1])) {
            deep = t; --l;
        }

        for (var i = -1; ++i < l; ) {
            t = args[i];
            _mix(o, t, deep, force);
        }

        return o;
    },

    // Deep mixin, also merge array element if not exist.
    deepMix = function(r, s, force) {
        if (r && s && typeof r === 'object' && r.constructor === s.constructor) {
            var mergeArr = Array.isArray(s);
            if (mergeArr) {
                for (var i = -1, l = s.length, rl = r.length, v, tmp; ++i < l;) { v = s[i];
                    if (v && typeof v === 'object') {
                        if (i > rl) { r.push(tmp = (v.constructor === Array ? [] : {})); }
                        else { tmp = r[i]; }
                        deepMix(tmp, v, force);
                    } else {
                        if (force) { r[i] = v; }
                        else if (!~r.indexOf(v)) { r.push(v); }
                    }
                }
            } else {
                for (var i in s) if (s.hasOwnProperty(i)) { var v = s[i];
                    if (v && typeof v === 'object' && r[i] && typeof r[i] === 'object') {
                        r[i] = force ? v : deepMix(r[i], v, force);
                    } else {
                        if (r[i] == null || force) { r[i] = v; }
                    }
                }
            }
        }
        return r;
    },

    merge = function(r, s) {
        var o = {}, args = slice.call(arguments, 0);
        args.unshift(o);
        mix.apply(null, args);
        return o;
    },

    forEach = function(o, fn) {
        if (Array.isArray(o)) return o.forEach(fn);
        else for (var k in o) {
            if (o.hasOwnProperty(k)) {
                fn(o[k], k);
            }
        }
    };

var lang = {
    /**
     * Mixin dist object to receiver.
     *
     * @method mix
     */
    mix: mix,

    /**
     * Depth mixin, also merge array element if exist.
     * @method deepMixin
     */
    deepMix: deepMix,

    /**
     * Merge object to a new object.
     *
     * @method merge
     */
    merge: merge,

    /**
     * Generic forEach for array or object.
     *
     * @param {Object|Array} o
     * @param {Function} fn iterator callback function.
     */
    forEach: forEach,

    /**
     * Inherit the prototype methods from one constructor into another and implements
     * cotr prototypes.
     *
     * extends from #inherits() or module #util
     */
    inherits: function(ctor, superCtor, prototype) {
        return nativeUtil.inherits(ctor, superCtor)
    }
};

// Exports
module.exports = lang;

require('fs').readdirSync(__dirname + "/lib/lang").forEach(function (f) {
  if (!f.match(/\.js$/)) return
  lang[f.replace(/\.js$/, '')] = require('./lib/lang/' + f);
});

}(require, exports, module));
