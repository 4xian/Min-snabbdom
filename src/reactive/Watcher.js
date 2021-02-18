import Dep from "./Dep";

var uid = 0;

export default class Wathcher {
    constructor(target, expression, callback) {
        console.log('Wathcher类');
        this.id = uid++;
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        this.value = this.get();
    }

    update() {
        this.getAndInvoke(this.callback);
    }

    // 进入依赖收集状态
    get() {
        // 全局的Dep.target设置为Watcher本身
        Dep.target = this;
        const obj = this.target;
        let value;

        try {
            value = this.getter(obj);
        } finally {
            Dep.target = null;
        }

        return value;
    }

    getAndInvoke(cb) {
        const newVal = this.get();
        if (newVal !== this.value || typeof newVal === 'object') {
            const oldVal = this.value;
            this.value = newVal;
            cb.call(this.target, newVal, oldVal)
        }
    }
}

// 解析a.b.c的深层值
function parsePath(str) {
    let temp = str.split('.');
    return (obj) => {
        temp.forEach(ele => {
            obj = obj[ele];
        });
        return obj;
    }
}