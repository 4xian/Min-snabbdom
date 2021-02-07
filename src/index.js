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


import h from './snabbdom/h';
import patch from './snabbdom/patch';

let vnode = h('p', {}, '哈哈');

let box = document.getElementById('box');
patch(box, vnode)

// console.log(vnode);