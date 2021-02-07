import vnode from './vnode';

// console.log(vnode('div', {}, [], '123', ''));
// (sel, data, children, text, elm)
/* 
    h函数处理三种情况：
    1. h('div', {}, '文字');
    2. h('div', {}, [
        h('p', {}, '')
    ]);
    3. h('div', {}, h());
*/

export default function (sel, data, c) {
    if (arguments.length !== 3) {
        throw new Error('必须传入三个参数！')
    }
    if (typeof c === 'string' || typeof c === 'number') {
        // 第一种情况
        return vnode(sel, data, undefined, c, undefined);
    } else if (Array.isArray(c)) {
        // 第二种情况
        let temp = [];
        c.forEach(item => {
            if (!(typeof c === 'object') && c.hasOwnProperty('sel')) {
                throw new Error('传入的数组中只能为h函数！')
            }
            temp.push(item)
        })
        return vnode(sel, data, temp, undefined, undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        // 第三种情况
        // 只有一个孩子情况
        return vnode(sel, data, [c], undefined, undefined)
    } else {
        throw new Error('第三个参数类型只能为：string || number || [] || object')
    }
}