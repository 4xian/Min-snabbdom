var uid = 0;

export default class Dep {
    constructor() {
        // console.log('Dep类');
        // 数组储存订阅者 Watcher实例
        this.id = uid++;
        this.subs = [];
    }

    // 添加订阅
    addSubs(sub) {
        this.subs.push(sub);
    }

    // 添加依赖
    depend() {
        // Dep.target为指定的全局的位置
        if (Dep.target) {
            this.addSubs(Dep.target);
        }
    }

    // 通知更新
    notify() {
        // console.log('通知');
        const tempSubs = this.subs.slice();
        tempSubs.forEach(item => {
            item.update();
        })
    }
}