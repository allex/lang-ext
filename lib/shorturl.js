/**
 * Short URL utility
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 */
var hash = require('./hash');
var md5 = hash.md5;

// REF: http://www.codesphp.com/php-category/algorithms/php-short-url-algorithm-implementation.html
var compile = function($input) {
  $base32 = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', '0', '1', '2', '3', '4', '5'
  ];
 
  $hex = md5($input);
  $hexLen = $hex.length;
  $subHexLen = $hexLen / 8;
  $output = [];
 
  for ($i = 0; $i < $subHexLen; $i++) {
    $subHex = $hex.substr($i * 8, 8);
    $int = 0x3FFFFFFF & (1 * ('0x' + $subHex));
    $out = '';
 
    for ($j = 0; $j < 6; $j++) {
      $val = 0x0000001F & $int;
      $out += $base32[$val];
      $int = $int >> 5;
    }
 
    $output.push($out);
  }
 
  return $output;
};

exports.compile = compile;
exports.generate = function(str) {
  return compile(str)[0];
};
