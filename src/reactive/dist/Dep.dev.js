"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uid = 0;

var Dep =
/*#__PURE__*/
function () {
  function Dep() {
    _classCallCheck(this, Dep);

    // console.log('Dep类');
    // 数组储存订阅者 Watcher实例
    this.id = uid++;
    this.subs = [];
  } // 添加订阅


  _createClass(Dep, [{
    key: "addSubs",
    value: function addSubs(sub) {
      this.subs.push(sub);
    } // 添加依赖

  }, {
    key: "depend",
    value: function depend() {
      // Dep.target为指定的全局的位置
      if (Dep.target) {
        this.addSubs(Dep.target);
      }
    } // 通知更新

  }, {
    key: "notify",
    value: function notify() {
      // console.log('通知');
      var tempSubs = this.subs.slice();
      tempSubs.forEach(function (item) {
        item.update();
      });
    }
  }]);

  return Dep;
}();

exports["default"] = Dep;