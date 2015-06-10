var hasOwn = Object.prototype.hasOwnProperty;
var global = this;

// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
var exportPath = function(/*String*/ name, /*Object*/ value, /*Object?*/ context, /*Boolean?*/ overwrite) {
    var parts = name.split('.'), p = parts.pop(), obj = getProp(parts, true, context);
    if (obj && p) {
        if (!overwrite && value && typeof value === 'object' && obj[p] !== undefined) {
            obj = obj[p] || (obj[p] = {});
            for (p in value) {
                if (hasOwn.call(value, p)) {
                    obj[p] = value[p];
                }
            }
        } else {
            obj[p] = value;
        }
        return value;
    }
};

var getProp = function(/*Array*/ parts, /*Boolean*/ create, /*Object?*/ context) {
    var obj = context || global;
    for (var i = 0, p; obj && (p = parts[i]); i++) {
        obj = (p in obj ? obj[p] : (create ? obj[p] = {} : undefined));
    }
    return obj; // mixed
};

module.exports = {
    /**
     * Builds an object structure for the provided namespace path,
     * ensuring that names that already exist are not overwritten if
     * `overwrite` not provided. For example:
     * "a.b.c" -> a = {};a.b={};a.b.c={};
     *
     * @method set
     * @param {Object=} context The object to add the path to; Default is {@code global}.
     * @param {String} name Name of the object that this file defines.
     * @param {*=} value The object to expose at the end of the path.
     * @param {Boolean} overwrite True to force set the new value. Defaults to true
     */
    set: function(o, ns, value, force) {
        exportPath(ns, value, o, force === undefined ? true : force)
    },

    /**
     * Get a property from a dot-separated string, such as "A.B.C".
     * Useful for longer api chains where you have to test each object in
     * the chain, or when you have an object reference in string format.
     *
     * @method get
     * @param {String} name Path to an property, in the form "A.B.C".
     * @param {Boolean} create Optional. Defaults to `false`. If `true`, Objects will
     *      be created at any point along the 'path' that is undefined.
     * @param {Object} context Optional. Object to use as root of path. Defaults to 'global'.
     */
    get: function(/*String*/ name, /*Boolean?*/ create, /*Object?*/ context) {
        return getProp(name.split('.'), create, context || global);
    }
}
