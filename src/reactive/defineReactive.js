import Dep from "./Dep";
import observe from "./observe";

export default function defineReactive(data, key, val) {
    // 制造闭包环境 使用val值
    if (arguments.length === 2) {
        val = data[key];
    }

    const dep = new Dep();
    // 嵌套元素进行递归observe
    let childOb = observe(val);

    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            // console.log(`获取${key}的值`);
            // 处于依赖收集状态
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                }
            }
            return val;
        },
        set(newVal) {
            // console.log(`修改${key}的值`);
            val = newVal;
            // 新值(对象)也需要observe
            childOb = observe(newVal);
            dep.notify();
        }
    })
}