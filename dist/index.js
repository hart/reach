'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = reach;
var defaults = {
  separator: '.',
  strict: false,
  default: undefined
};

function reach(obj, chain, options) {
  if (typeof chain !== 'string') {
    throw new TypeError("Reach path must a string. Found ".concat(chain, "."));
  }

  var settings = Object.assign({}, defaults, options);
  var path = chain.split(settings.separator);
  var ref = obj;

  for (var i = 0; i < path.length; ++i) {
    var key = path[i];

    if (key[0] === '-' && Array.isArray(ref)) {
      key = key.slice(1, key.length);
      key = ref.length - key;
    } // ref must be an object or function and contain key


    if (ref === null || _typeof(ref) !== 'object' && typeof ref !== 'function' || !(key in ref)) {
      if (settings.strict) {
        throw new Error("Invalid segment, ".concat(key, ", in reach path ").concat(chain, "."));
      }

      return settings.default;
    }

    ref = ref[key];
  }

  return ref;
}
