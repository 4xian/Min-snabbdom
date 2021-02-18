import defProp from "../utils";
import {
    arrMethods
} from "./array";
import defineReactive from "./defineReactive";
import Dep from "./Dep";
import observe from "./observe";

export default class Observer {
    // 将对象的每层属性都转为响应式的对象
    constructor(data) {
        // console.log('构造器执行:', data);

        this.dep = new Dep();

        defProp(data, '__ob__', this, false);
        if (Array.isArray(data)) {
            Object.setPrototypeOf(data, arrMethods);
            this.observeArr(data);
        } else {
            this.walk(data);
        }

    }

    // 对象的遍历
    walk(data) {
        // console.log('walk');
        for (const key in data) {
            defineReactive(data, key)
        }
    }

    // 数组的遍历
    observeArr(arr) {
        arr.forEach(ele => {
            observe(ele);
        });
    }
}