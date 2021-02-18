"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defProp;

function defProp(data, key, value, enumerable) {
  Object.defineProperty(data, key, {
    value: value,
    enumerable: enumerable,
    writable: true,
    configurable: true
  });
}