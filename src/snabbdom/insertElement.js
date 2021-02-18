// 创建节点，将vnode创建为DOM

export default function insertElement(vnode) {
    // 创建节点
    // console.log(vnode);
    let domNode = document.createElement(vnode.sel);

    // 判断vnode有子节点还是文本
    if (vnode.text !== '' && vnode.children === undefined || vnode.children.length === 0) {
        // 1. vnode内部是文本  
        domNode.innerText = vnode.text;

    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 2. vnode内部是子节点
        vnode.children.forEach(item => {
            let tempdom = insertElement(item);
            domNode.appendChild(tempdom);
        })
    }
    vnode.elm = domNode;

    return vnode.elm;
}