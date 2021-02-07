"use strict";

var _h = _interopRequireDefault(require("./snabbdom/h"));

var _patch = _interopRequireDefault(require("./snabbdom/patch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import {
//     init
// } from 'snabbdom/init'
// import {
//     classModule
// } from 'snabbdom/modules/class'
// import {
//     propsModule
// } from 'snabbdom/modules/props'
// import {
//     styleModule
// } from 'snabbdom/modules/style'
// import {
//     eventListenersModule
// } from 'snabbdom/modules/eventlisteners'
// import {
//     h
// } from 'snabbdom/h' // helper function for creating vnodes
// const patch = init([classModule, propsModule, styleModule, eventListenersModule])
// var container = document.getElementById('box');
// let myVnode = h('a', {
//     props: {
//         href: 'http://www.xxx.com'
//     }
// }, '简');
// console.log(myVnode);
// patch(container, myVnode);

/* 
    1. 同一个虚拟节点（选择器和key相同），才精细化比较；
    2. 同层比较，不跨层比较
*/
var vnode = (0, _h["default"])('p', {}, '哈哈');
var box = document.getElementById('box');
(0, _patch["default"])(box, vnode); // console.log(vnode);