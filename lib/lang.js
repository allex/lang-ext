/**
 * Common utilities function for nodejs.
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 * Licensed under the MIT license.
 */

var _slice = [].slice;

function isBoolean(o) {
    typeof o === 'boolean';
}

function _mix(r, s, deep, force) {
    for (var k in s) if (s.hasOwnProperty(k)) {
        if (s[k] && r[k] && deep && typeof s[k] === 'object') {
            _mix(r[k], s[k]);
        } else {
            if (r[k] === undefined || force) {
                r[k] = s[k];
            }
        }
    }
    return r;
}

function mix(o, s, deep, force) {
    var args = _slice.call(arguments, 1), l = args.length, t;

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
}

function merge(r, s) {
    var o = {}, args = _slice.call(arguments, 0);
    args.unshift(o);
    _mix.apply(null, args);
    return o;
}

function forEach(o, fn) {
    if (Array.isArray(o)) return o.forEach(fn);
    else for (var k in o) {
        if (o.hasOwnProperty(k)) {
            fn(o[k], k);
        }
    }
}

var lang = {
    isBoolean: isBoolean,

    /**
     * mixin dist object to receiver.
     * @method mix
     */
    mix: mix,

    /**
     * merge object to a new object.
     * @method merge
     */
    merge: merge,

    /**
     * Generic forEach for array or object.
     * @param {Object|Array} o
     * @param {Function} fn iterator callback function.
     */
    forEach: forEach,

    // lang.* namespace exports
    array: require('./lang/array'),
    string: require('./lang/string')
};

// add lang.sha1/md5/sha256/sha512/ripemd160
lang.mix(lang, require('./lang/hash'));

module.exports = lang;