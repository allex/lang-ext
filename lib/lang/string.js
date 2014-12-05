/**
 * Common utilities function for lang/string extends.
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 * Licensed under the MIT license.
 */

var BLANK_CHAR = ' ';

// php rtrim
var rtrim = function(s, c) {
    c = c ? c : BLANK_CHAR;
    var i = s.length - 1;
    for (; i >= 0 && s.charAt(i) === c; ) --i;
    return s.substring(0, i + 1);
};

// php ltrim
var ltrim = function ltrim(s, c) {
    if (s.length === 0) return s;
    c = c ? c : BLANK_CHAR;
    var i = 0;
    for (; s.charAt(i) === c && i < s.length; ) ++i;
    return s.substring(i);
};

exports.rtrim = rtrim;
exports.ltrim = ltrim;
exports.trim = function(s, c) { return rtrim(ltrim(s, c), c); };

// replace all by the specific string
exports.replaceAll = function(str, token, newToken, ignoreCase) {
    var i = -1, _token;

    if ((str = str + '') && typeof token === 'string') {
        _token = ignoreCase ? token.toLowerCase() : undefined;
        while ( (i = (
            _token !== undefined ?
                str.toLowerCase().indexOf(
                    _token,
                    i >= 0 ? i + newToken.length : 0
                ) : str.indexOf(
                    token,
                    i >= 0 ? i + newToken.length : 0
                )
        )) !== -1 ) {
            str = str.substring(0, i) + newToken + str.substring(i + token.length);
        }
    }

    return str;
};

// string to regex utilities by allex.
(function(exports) {

    var rEscRegExp = /([-.*+?^${}()|[\]\/\\])/g;

    function escapeRegExp(s) {
        return String(s).replace(rEscRegExp, '\\$1');
    }
    function wildcardToRegex(str, flag) {
        return new RegExp('^' + escapeRegExp(str).replace(/\\\*/g, '.*').replace(/\\\?/g, '.')
                .replace(/\\\(\.\*\\\)/g, '(.*)') + '$', flag);
    }

    var rPattern = /\(([^)]*)\)/;
    function patternToRegex(str, flag) {
        var sb = [], m, offset = 0, token;

        while (str) {
            if (m = str.match(rPattern)) {
                offset = m.index;
                sb.push(escapeRegExp(str.slice(0, offset)));

                token = m[1];
                // fix the specific tokens.
                if (token.length === 1) {
                    switch (token) {
                    case '*':
                        token = '.*';
                        break;
                    case '?':
                        token = '.?';
                        break;
                    }
                }
                sb.push('(' + token + ')');
                str = str.slice(offset + m[0].length);
            } else {
                sb.push(escapeRegExp(str));
                str = '';
            }
        }
        str = sb.join('');

        return new RegExp(str, flag);
    }

    exports.escapeRegExp = escapeRegExp;
    exports.wildcardToRegex = wildcardToRegex;
    exports.patternToRegex = patternToRegex;

}(exports));

