"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Dep = _interopRequireDefault(require("./Dep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uid = 0;

var Wathcher =
/*#__PURE__*/
function () {
  function Wathcher(target, expression, callback) {
    _classCallCheck(this, Wathcher);

    console.log('Wathcher类');
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();
  }

  _createClass(Wathcher, [{
    key: "update",
    value: function update() {
      this.getAndInvoke(this.callback);
    } // 进入依赖收集状态

  }, {
    key: "get",
    value: function get() {
      // 全局的Dep.target设置为Watcher本身
      _Dep["default"].target = this;
      var obj = this.target;
      var value;

      try {
        value = this.getter(obj);
      } finally {
        _Dep["default"].target = null;
      }

      return value;
    }
  }, {
    key: "getAndInvoke",
    value: function getAndInvoke(cb) {
      var newVal = this.get();

      if (newVal !== this.value || _typeof(newVal) === 'object') {
        var oldVal = this.value;
        this.value = newVal;
        cb.call(this.target, newVal, oldVal);
      }
    }
  }]);

  return Wathcher;
}(); // 解析a.b.c的深层值


exports["default"] = Wathcher;

function parsePath(str) {
  var temp = str.split('.');
  return function (obj) {
    temp.forEach(function (ele) {
      obj = obj[ele];
    });
    return obj;
  };
}