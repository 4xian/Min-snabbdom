"use strict";

var _observe = _interopRequireDefault(require("./reactive/observe"));

var _Watcher = _interopRequireDefault(require("./reactive/Watcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* 
    1. 同一个虚拟节点（选择器和key相同），才精细化比较；
    2. 同层比较，不跨层比较
*/

/* import h from './snabbdom/h';
import patch from './snabbdom/patch';


// 第一次上树
let box = document.getElementById('box');
let vnode = h('ul', {}, [


    h('li', {
        key: 'A'
    }, '老A'),
    h('li', {
        key: 'D'
    }, 'D'),
    h('li', {
        key: 'E'
    }, 'E'),
    h('li', {
        key: 'F'
    }, 'F'),

    h('li', {
        key: 'G'
    }, '新G'),

]);
patch(box, vnode);

// 第二次上树
let btn = document.getElementById('btn');
let changeVnode = h('ul', {}, [
    h('li', {
        key: 'A'
    }, '老A'),

    h('li', {
        key: 'C'
    }, 'C'),
    h('li', {
        key: 'D'
    }, 'D'),
    h('li', {
        key: 'B'
    }, '老B'),
    // h('p', {key:'B'}, '新节点'),
]);
btn.onclick = () => {
    patch(vnode, changeVnode);
}
 */
var obj = {
  a: {
    m: {
      n: 5
    }
  },
  b: 9,
  c: [2, 5, 9]
}; // defineReactive(obj, 'a');

(0, _observe["default"])(obj); // obj.b++;
// console.log(obj.b);
// obj.c.splice(0, 2, 10, 15);

new _Watcher["default"](obj, 'a.m.n', function (val) {
  console.log(val);
});
obj.a.m.n = 99;
console.log(obj);