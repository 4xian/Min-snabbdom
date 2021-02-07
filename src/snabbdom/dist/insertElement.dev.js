"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = insertElement;

// 创建节点，将vnode创建为DOM
function insertElement(vnode) {
  // 创建节点
  // console.log(vnode);
  var domNode = document.createElement(vnode.sel); // 判断vnode有子节点还是文本

  if (vnode.text !== '' && vnode.children === undefined || vnode.children.length === 0) {
    // 1. vnode内部是文本  
    domNode.innerText = vnode.text;
    vnode.elm = domNode;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {// 2. vnode内部是子节点
  }

  return vnode.elm;
}