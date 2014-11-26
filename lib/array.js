/**
 * Utility functions for lang/array extends
 *
 * @author Allex (allex.wxn@gmail.com)
 * Licensed under the MIT license.
 */

// unique array
exports.unique = function(array) {
    var arr = [];
    for (var i = -1, l = array.length, el; ++i < l; ) {
        el = array[i];
        if (arr.indexOf(el) === -1) {
            arr.push(el);
        }
    }
    return arr;
};

// Assuming |array_of_dictionaries| is structured like this:
// [{id: 1, ... }, {id: 2, ...}, ...], you can use
// lookup(array_of_dictionaries, 'id', 2) to get the dictionary with id == 2.
exports.lookup = function(array_of_dictionaries, field, value) {
    var filter = function (dict) {return dict[field] == value;};
    var matches = array_of_dictionaries.filter(filter);
    if (matches.length == 0) {
        return undefined;
    } else if (matches.length == 1) {
        return matches[0]
    } else {
        throw new Error('Failed lookup of field "' + field + '" with value "' + value + '"');
    }
}
