"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Compiler = _interopRequireDefault(require("./Compiler"));

var _observe = _interopRequireDefault(require("./reactive/observe"));

var _Watcher = _interopRequireDefault(require("./reactive/Watcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Min =
/*#__PURE__*/
function () {
  function Min(options) {
    _classCallCheck(this, Min);

    this.$options = options || {};
    this._data = options.data || undefined; // 观测数据

    (0, _observe["default"])(this._data); // 声明周期

    this._initData();

    this._initWatcher();

    this._initComputed(); // 模板编译


    new _Compiler["default"](options.el, this);
  }

  _createClass(Min, [{
    key: "_initData",
    value: function _initData() {
      var self = this;
      Object.keys(this._data).forEach(function (key) {
        // console.log(key);
        Object.defineProperty(self, key, {
          get: function get() {
            return self._data[key];
          },
          set: function set(newVal) {
            self._data[key] = newVal;
          }
        });
      });
    }
  }, {
    key: "_initWatcher",
    value: function _initWatcher() {
      var self = this,
          watch = this.$options.watch;
      Object.keys(watch).forEach(function (key) {
        new _Watcher["default"](self, key, watch[key]);
      });
    }
  }, {
    key: "_initComputed",
    value: function _initComputed() {}
  }]);

  return Min;
}();

exports["default"] = Min;