import Compiler from "./Compiler";
import observe from "./reactive/observe";
import Wathcher from "./reactive/Watcher";

export default class Min {
    constructor(options) {
        this.$options = options || {};
        this._data = options.data || undefined;
        // 观测数据
        observe(this._data)

        // 声明周期
        this._initData();
        this._initWatcher();
        this._initComputed();

        // 模板编译
        new Compiler(options.el, this)
    }

    _initData() {
        let self = this;
        Object.keys(this._data).forEach(key => {
            // console.log(key);
            Object.defineProperty(self, key, {
                get() {
                    return self._data[key];
                },
                set(newVal) {
                    self._data[key] = newVal;
                }
            })
        })
    }

    _initWatcher() {
        let self = this,
            watch = this.$options.watch;
        Object.keys(watch).forEach(key => {
            new Wathcher(self, key, watch[key])
        })
    }

    _initComputed() {

    }

}