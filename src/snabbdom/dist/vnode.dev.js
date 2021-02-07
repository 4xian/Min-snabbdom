"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

// 将参数组合成对象返回
function _default(sel, data, children, text, elm) {
  return {
    sel: sel,
    data: data,
    children: children,
    text: text,
    elm: elm
  };
}