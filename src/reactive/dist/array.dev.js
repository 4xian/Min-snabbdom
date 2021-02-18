"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrMethods = void 0;

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 对数组进行响应式观察
var arrPrototype = Array.prototype;
var arrMethods = Object.create(arrPrototype); // export default arrMethods;

exports.arrMethods = arrMethods;
var sevenArr = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
sevenArr.forEach(function (item) {
  var originMethods = arrPrototype[item];
  (0, _utils["default"])(arrMethods, item, function () {
    console.log('定义数组方法'); // 继承原来的方法

    var result = originMethods.apply(this, arguments);
    var args = Array.prototype.slice.call(arguments); // 伪数组变为真数组

    var ob = this.__ob__; // push unshift splice 三个方法有插入新值 需将新值也进行observe

    var inserted = [];

    switch (item) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArr(inserted);
    }

    ob.dep.notify();
    return result;
  }, false);
});