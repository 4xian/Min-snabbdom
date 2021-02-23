import Watcher from './reactive/Watcher';
export default class Compile {
    constructor(el, min) {
        // min实例
        this.$Min = min;
        // 挂载点
        this.$el = document.querySelector(el);
        if (this.$el) {
            let _fragment = this.node2Fragment(this.$el);
            // 编译
            this.compile(_fragment);

            // 上树
            this.$el.appendChild(_fragment);
        }
    }

    // 节点转html片段
    node2Fragment(el) {
        // console.log(el);
        let fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        // console.log(fragment);
        return fragment;

    }

    // 模板编译 
    compile(el) {
        let childNodes = el.childNodes;
        let self = this,
            reg = /\{\{(.*)\}\}/;
        childNodes.forEach(node => {
            let text = node.textContent;
            // console.log(text);
            if (node.nodeType === 1) {
                // 说明是标签
                self.compileElement(node);
            } else if (node.nodeType === 3 && reg.test(text)) {
                // 说明是文字
                let name = text.match(reg)[1];
                self.compileText(node, name);
            }
        });
    }

    compileElement(node) {
        let nodeAttr = node.attributes,
            self = this;
        [...nodeAttr].forEach(attr => {
            let attrName = attr.name,
                value = attr.value,
                dir = attrName.substring(2);
            // console.log(dir);
            // 判断是不是指令
            if (attrName.indexOf('v-') !== -1) {
                if (dir === 'model') {
                    // v-model
                    new Watcher(self.$Min, value, val => {
                        node.value = val;
                    })
                    let v = self.getMinVal(self.$Min, value);
                    node.value = v;

                    // 监听新值
                    node.addEventListener('input', e => {
                        let newVal = e.target.value;
                        self.setMinVal(self.$Min, value, newVal);
                        v = newVal;
                    })

                } else if (dir === 'for') {
                    // v-for
                } else if (dir === 'if') {
                    // v-if
                }
            }
        })
    }
    compileText(node, name) {
        // console.log(name);
        node.textContent = this.getMinVal(this.$Min, name);
        new Watcher(this.$Min, name, val => {
            node.textContent = val;
        });
    }

    // 获取a.b.c的值
    getMinVal(min, exp) {
        let val = min;
        exp = exp.split('.');
        exp.forEach(item => {
            val = val[item]
        })
        // console.log(val);
        return val;
    }
    // 设置a.b.c的值
    setMinVal(min, exp, value) {
        let val = min;
        exp = exp.split('.');
        exp.forEach((item, i) => {
            if (i < exp.length - 1) {
                val = val[item]
            } else {
                val[item] = value;
            }

        })
        // console.log(val);
        return val;
    }
}