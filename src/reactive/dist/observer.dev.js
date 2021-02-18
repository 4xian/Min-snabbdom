"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("../utils"));

var _array = require("./array");

var _defineReactive = _interopRequireDefault(require("./defineReactive"));

var _Dep = _interopRequireDefault(require("./Dep"));

var _observe = _interopRequireDefault(require("./observe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Observer =
/*#__PURE__*/
function () {
  // 将对象的每层属性都转为响应式的对象
  function Observer(data) {
    _classCallCheck(this, Observer);

    // console.log('构造器执行:', data);
    this.dep = new _Dep["default"]();
    (0, _utils["default"])(data, '__ob__', this, false);

    if (Array.isArray(data)) {
      Object.setPrototypeOf(data, _array.arrMethods);
      this.observeArr(data);
    } else {
      this.walk(data);
    }
  } // 对象的遍历


  _createClass(Observer, [{
    key: "walk",
    value: function walk(data) {
      // console.log('walk');
      for (var key in data) {
        (0, _defineReactive["default"])(data, key);
      }
    } // 数组的遍历

  }, {
    key: "observeArr",
    value: function observeArr(arr) {
      arr.forEach(function (ele) {
        (0, _observe["default"])(ele);
      });
    }
  }]);

  return Observer;
}();

exports["default"] = Observer;