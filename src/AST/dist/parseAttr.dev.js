"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseAttr;

function parseAttr(attrs) {
  if (attrs == undefined) return [];
  var isQuote = false,
      point = 0,
      result = [];

  for (var index = 0; index <= attrs.length; index++) {
    var _char = attrs[index];

    if (_char === '"') {
      // 遇见引号 说明属性开始
      isQuote = !isQuote;
    } else if (_char === ' ' && !isQuote) {
      //  遇见空格 并且不在引号中 开始收集 引号内内容
      if (!/^\s*$/.test(attrs.substring(point, index))) result.push(attrs.substring(point, index).trim());
      point = index;
    }
  }

  result.push(attrs.substring(point).trim());
  result = result.map(function (item) {
    var temp = item.match(/^(.+)="(.+)"/);
    return {
      name: temp[1],
      value: temp[2]
    };
  });
  return result;
}