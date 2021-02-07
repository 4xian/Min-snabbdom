"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _vnode = _interopRequireDefault(require("./vnode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// console.log(vnode('div', {}, [], '123', ''));
// (sel, data, children, text, elm)

/* 
    h函数处理三种情况：
    1. h('div', {}, '文字');
    2. h('div', {}, [
        h('p', {}, '')
    ]);
    3. h('div', {}, h());
*/
function _default(sel, data, c) {
  if (arguments.length !== 3) {
    throw new Error('必须传入三个参数！');
  }

  if (typeof c === 'string' || typeof c === 'number') {
    // 第一种情况
    return (0, _vnode["default"])(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // 第二种情况
    var temp = [];
    c.forEach(function (item) {
      if (!(_typeof(c) === 'object') && c.hasOwnProperty('sel')) {
        throw new Error('传入的数组中只能为h函数！');
      }

      temp.push(item);
    });
    return (0, _vnode["default"])(sel, data, temp, undefined, undefined);
  } else if (_typeof(c) === 'object' && c.hasOwnProperty('sel')) {
    // 第三种情况
    // 只有一个孩子情况
    return (0, _vnode["default"])(sel, data, [c], undefined, undefined);
  } else {
    throw new Error('第三个参数类型只能为：string || number || [] || object');
  }
}