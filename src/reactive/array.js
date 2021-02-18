// 对数组进行响应式观察

import defProp from "../utils";

const arrPrototype = Array.prototype;
export const arrMethods = Object.create(arrPrototype);
// export default arrMethods;
const sevenArr = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

sevenArr.forEach(item => {
    const originMethods = arrPrototype[item];
    defProp(arrMethods, item, function () {
        console.log('定义数组方法');
        // 继承原来的方法
        const result = originMethods.apply(this, arguments);
        const args = [...arguments]; // 伪数组变为真数组
        const ob = this.__ob__;
        // push unshift splice 三个方法有插入新值 需将新值也进行observe
        let inserted = [];

        switch (item) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }

        if (inserted) {
            ob.observeArr(inserted);
        }
        ob.dep.notify();
        return result;
    }, false)
})