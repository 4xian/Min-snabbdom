// 将参数组合成对象返回
export default function (sel, data, children, text, elm) {
    let key = data.key;
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}