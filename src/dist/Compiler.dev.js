"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Watcher = _interopRequireDefault(require("./reactive/Watcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Compile =
/*#__PURE__*/
function () {
  function Compile(el, min) {
    _classCallCheck(this, Compile);

    // min实例
    this.$Min = min; // 挂载点

    this.$el = document.querySelector(el);

    if (this.$el) {
      var _fragment = this.node2Fragment(this.$el); // 编译


      this.compile(_fragment); // 上树

      this.$el.appendChild(_fragment);
    }
  } // 节点转html片段


  _createClass(Compile, [{
    key: "node2Fragment",
    value: function node2Fragment(el) {
      // console.log(el);
      var fragment = document.createDocumentFragment();
      var child;

      while (child = el.firstChild) {
        fragment.appendChild(child);
      } // console.log(fragment);


      return fragment;
    } // 模板编译 

  }, {
    key: "compile",
    value: function compile(el) {
      var childNodes = el.childNodes;
      var self = this,
          reg = /\{\{(.*)\}\}/;
      childNodes.forEach(function (node) {
        var text = node.textContent; // console.log(text);

        if (node.nodeType === 1) {
          // 说明是标签
          self.compileElement(node);
        } else if (node.nodeType === 3 && reg.test(text)) {
          // 说明是文字
          var name = text.match(reg)[1];
          self.compileText(node, name);
        }
      });
    }
  }, {
    key: "compileElement",
    value: function compileElement(node) {
      var nodeAttr = node.attributes,
          self = this;

      _toConsumableArray(nodeAttr).forEach(function (attr) {
        var attrName = attr.name,
            value = attr.value,
            dir = attrName.substring(2); // console.log(dir);
        // 判断是不是指令

        if (attrName.indexOf('v-') !== -1) {
          if (dir === 'model') {
            // v-model
            new _Watcher["default"](self.$Min, value, function (val) {
              node.value = val;
            });
            var v = self.getMinVal(self.$Min, value);
            node.value = v; // 监听新值

            node.addEventListener('input', function (e) {
              var newVal = e.target.value;
              self.setMinVal(self.$Min, value, newVal);
              v = newVal;
            });
          } else if (dir === 'for') {// v-for
          } else if (dir === 'if') {// v-if
          }
        }
      });
    }
  }, {
    key: "compileText",
    value: function compileText(node, name) {
      // console.log(name);
      node.textContent = this.getMinVal(this.$Min, name);
      new _Watcher["default"](this.$Min, name, function (val) {
        node.textContent = val;
      });
    } // 获取a.b.c的值

  }, {
    key: "getMinVal",
    value: function getMinVal(min, exp) {
      var val = min;
      exp = exp.split('.');
      exp.forEach(function (item) {
        val = val[item];
      }); // console.log(val);

      return val;
    } // 设置a.b.c的值

  }, {
    key: "setMinVal",
    value: function setMinVal(min, exp, value) {
      var val = min;
      exp = exp.split('.');
      exp.forEach(function (item, i) {
        if (i < exp.length - 1) {
          val = val[item];
        } else {
          val[item] = value;
        }
      }); // console.log(val);

      return val;
    }
  }]);

  return Compile;
}();

exports["default"] = Compile;