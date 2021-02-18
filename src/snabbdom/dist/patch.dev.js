"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = patch;

var _vnode = _interopRequireDefault(require("./vnode"));

var _insertElement = _interopRequireDefault(require("./insertElement"));

var _patchVnode = _interopRequireDefault(require("./patchVnode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* 
    节点比较是在虚拟节点中操作的
    1. 判断传入的第一个参数(oldVnode)是DOM节点还是虚拟节点：
        {
            1.1 是DOM节点：则需将(oldVnode)包装成虚拟节点;

            1.2 是虚拟节点：进一步判断oldVnode与newVnode是否为同一节点(sel和key是否相同):
                {
                    1.1.1 不是同一节点：先插入新节点，后删除旧节点;

                    1.1.2 是同一节点：进一步判断oldVnode与newVnode是否为同一对象
                        {
                            1.1.2.1 是同一对象：什么都不做;

                            1.1.2.2 不是同一对象：判断新节点是否有文字text
                                {
                                    1.1.2.2.1 有text：判断新节点的text与老节点的是否相同
                                        {
                                            相同则什么都不做;
                                            不同则用innerText改为新节点的text;
                                        }
                                    
                                    1.1.2.2.2 无text(意味着新节点有children)：进一步判断老节点是否有children
                                        {
                                            老节点无children：清空老节点的text，把新节点的children加入dom中；
                                            老节点有children（即新老节点都有children）重要！！！：
                                        }
                                }
                        }
                    
                }
            
        }
     
*/
function patch(oldVnode, newVnode) {
  // 1 // dom节点需要包装成虚拟节点
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    oldVnode = (0, _vnode["default"])(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  } // 2 同一节点


  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    (0, _patchVnode["default"])(oldVnode, newVnode);
  } else {
    // 不同节点
    var tempdom = (0, _insertElement["default"])(newVnode);

    if (oldVnode.elm && tempdom) {
      // 插入到旧节点之前
      oldVnode.elm.parentNode.insertBefore(tempdom, oldVnode.elm);
    } // 删除老节点


    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}