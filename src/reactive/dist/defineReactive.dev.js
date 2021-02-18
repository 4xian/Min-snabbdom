"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defineReactive;

var _Dep = _interopRequireDefault(require("./Dep"));

var _observe = _interopRequireDefault(require("./observe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function defineReactive(data, key, val) {
  // 制造闭包环境 使用val值
  if (arguments.length === 2) {
    val = data[key];
  }

  var dep = new _Dep["default"](); // 嵌套元素进行递归observe

  var childOb = (0, _observe["default"])(val);
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function get() {
      // console.log(`获取${key}的值`);
      // 处于依赖收集状态
      if (_Dep["default"].target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();
        }
      }

      return val;
    },
    set: function set(newVal) {
      // console.log(`修改${key}的值`);
      val = newVal; // 新值(对象)也需要observe

      childOb = (0, _observe["default"])(newVal);
      dep.notify();
    }
  });
}