"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = observe;

var _Observer = _interopRequireDefault(require("./Observer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function observe(obj) {
  if (_typeof(obj) !== 'object') return;
  var ob;

  if (typeof obj.__ob__ !== 'undefined') {
    ob = obj.__ob__;
  } else {
    ob = new _Observer["default"](obj);
  }

  return ob;
}