/**
 * Common utilities function for lang/string extends.
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 * Licensed under the MIT license.
 */

var BLANK_CHAR = ' ';

// php rtrim
exports.rtrim = function(s, c) {
    c = c ? c : BLANK_CHAR;
    var i = s.length - 1;
    for (; i >= 0 && s.charAt(i) === c; ) --i;
    return s.substring(0, i + 1);
};

// php ltrim
exports.ltrim = function ltrim(s, c) {
    if (s.length === 0) return s;
    c = c ? c : BLANK_CHAR;
    var i = 0;
    for (; s.charAt(i) === c && i < s.length; ) ++i;
    return s.substring(i);
};

