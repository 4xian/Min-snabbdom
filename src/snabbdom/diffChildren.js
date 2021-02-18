// 比较新老节点的children
/* 
    diff算法优化策略：
        1. 新前 旧前
        2. 新后 旧后
        3. 新后 旧前 (新前指向的节点，移动到旧后之后)
        4. 新前 旧后 (新前指向的节点，移动到旧前之前)

*/

import insertElement from "./insertElement";
import patchVnode from "./patchVnode";

// 判断是否为同一虚拟节点
function isSameVnode(oldVnode, newVnode) {
    return oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key
}

export default function diffChildren(parentElm, oldChildren, newChildren) {
    // 新前 旧前 新后 旧后 (四个指针)
    // 新前节点 旧前节点 新后节点 旧后节点 (四个节点)
    let newStartIdx = 0,
        oldStartIdx = 0,
        newEndIdx = newChildren.length - 1,
        oldEndIdx = oldChildren.length - 1,
        newStartVnode = newChildren[0],
        oldStartVnode = oldChildren[0],
        newEndVnode = newChildren[newEndIdx],
        oldEndVnode = oldChildren[oldEndIdx],
        keyMap = null; // 存旧节点的key

    // 索引不越界
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

        if (oldStartVnode === null || oldChildren[oldStartIdx] === undefined) {
            oldStartVnode = oldChildren[++oldStartIdx];
        } else if (newStartVnode === null || newChildren[newStartIdx] === undefined) {
            newStartVnode = newChildren[++newStartIdx];
        } else if (oldEndVnode === null || oldChildren[oldEndIdx] === undefined) {
            oldEndVnode = oldChildren[--oldEndIdx];
        } else if (newEndVnode === null || newChildren[newEndIdx] === undefined) {
            newEndVnode = newChildren[--newEndIdx];
        }
        if (isSameVnode(oldStartVnode, newStartVnode)) {
            // 新前 旧前
            console.log('1 新前 旧前 命中！');
            patchVnode(oldStartVnode, newStartVnode);
            oldStartVnode = oldChildren[++oldStartIdx];
            newStartVnode = newChildren[++newStartIdx];

        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            // 新后 旧后
            console.log('2 新后 旧后 命中！');
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldChildren[--oldEndIdx];
            newEndVnode = newChildren[--newEndIdx];

        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // 新后 旧前 (新前指针移动到旧后的后面)
            console.log('3 新后 旧前 命中！');
            patchVnode(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldStartVnode = oldChildren[++oldStartIdx];
            newEndVnode = newChildren[--newEndIdx];

        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // 新前 旧后 (新前指针移动到旧前的前面)
            console.log('4 新前 旧后 命中！');
            patchVnode(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldChildren[--oldEndIdx];
            newStartVnode = newChildren[++newStartIdx];
        } else {
            // 四种情况之外
            // 将旧节点的key存起来，然后去新节点找是否有该key 有则移动 没有则插入
            if (!keyMap) {
                keyMap = {};
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    let key = oldChildren[i].key;
                    if (key !== undefined) {
                        keyMap[key] = i;
                    }
                }
            }

            const oldIdx = keyMap[newStartVnode.key];
            if (oldIdx === undefined) {
                // 该项(newStartVnode)需要新增
                parentElm.insertBefore(insertElement(newStartVnode), oldStartVnode.elm)
            } else {
                // 旧节点需要移动
                const oldElmMove = oldChildren[oldIdx];
                if (oldElmMove.nodeType === 1) {
                    console.log('旧节点需要移动');
                    patchVnode(oldElmMove, newStartVnode);
                    // 将移动的项设为undefined 表示已经处理
                    oldChildren[oldIdx] = undefined;
                    // 移动
                    parentElm.insertBefore(oldElmMove, oldStartVnode)
                }

            }
            // 指针下移 移动新的头
            newStartVnode = newChildren[++newStartIdx];
        }
    }

    // 新节点有新增 新前<=新后
    if (newStartIdx <= newEndIdx && oldStartIdx >= oldEndIdx) {
        console.log('新节点需要新增');
        // const pivot = newChildren[newEndIdx + 1] === undefined ? null : newChildren[newEndIdx + 1].elm;
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore 可以识别null 如果是null则自动加到队尾 和appendChild一样
            parentElm.insertBefore(insertElement(newChildren[i]), oldChildren[oldStartIdx].elm);
        }
    } else if (oldStartIdx <= oldEndIdx && newStartIdx >= newEndIdx) {
        // 新节点有删除 旧前<=旧后
        console.log('旧节点需要删除');
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldChildren[i]) {
                // console.log(oldChildren[i]);
                parentElm.removeChild(oldChildren[i].elm);
            }
        }
    }




}