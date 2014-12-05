/**
 * Exports hash shortcuts.
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 * Licensed under the MIT license.
 */

var crypto = require('crypto');
var algos = ['sha1', 'md5', 'sha256', 'sha512', 'ripemd160'];
var encoding = 'hex';

algos.forEach(function(algo) {
    exports[ algo ] = function(data, salt) {
        var hash;
        data += '';
        if (typeof salt != 'undefined') {
            hash = crypto.createHmac(algo, salt).update(data).digest(encoding);
        }
        else {
            hash = crypto.createHash(algo).update(data).digest(encoding);
        }
        return hash;
    };
});
