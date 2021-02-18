import diffChildren from "./diffChildren";
import insertElement from "./insertElement";

export default function patchVnode(oldVnode, newVnode) {
    // 同一节点
    if (oldVnode === newVnode) return;
    //不是同一对象中有text
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
        // 新老text是否相同
        if (oldVnode.text !== newVnode.text) {
            oldVnode.elm.innerText = newVnode.text;
        }
    } else {
        // 不是同一对象中无text
        // 新老都有children（重点！！！）
        if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
            diffChildren(oldVnode.elm, oldVnode.children, newVnode.children);
        } else {
            // 新有children，老无children

            // 清空老节点的text
            oldVnode.elm.innerHTML = '';
            // 遍历新节点的children，创建dom，上树
            newVnode.children.forEach(item => {
                let temp = insertElement(item);
                oldVnode.elm.appendChild(temp);
            });
        }
    }
}