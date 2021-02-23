/* 
    1. 同一个虚拟节点（选择器和key相同），才精细化比较；
    2. 同层比较，不跨层比较
*/




/* 

渲染到界面

import h from './snabbdom/h';
import patch from './snabbdom/patch';


// 第一次上树
let box = document.getElementById('box');
let vnode = h('ul', {}, [


    h('li', {
        key: 'A'
    }, '老A'),
    h('li', {
        key: 'D'
    }, 'D'),
    h('li', {
        key: 'E'
    }, 'E'),
    h('li', {
        key: 'F'
    }, 'F'),

    h('li', {
        key: 'G'
    }, '新G'),

]);
patch(box, vnode);

// 第二次上树
let btn = document.getElementById('btn');
let changeVnode = h('ul', {}, [
    h('li', {
        key: 'A'
    }, '老A'),

    h('li', {
        key: 'C'
    }, 'C'),
    h('li', {
        key: 'D'
    }, 'D'),
    h('li', {
        key: 'B'
    }, '老B'),
    // h('p', {key:'B'}, '新节点'),
]);
btn.onclick = () => {
    patch(vnode, changeVnode);
}
 */




/* 

响应式原理

import observe from './reactive/observe';
import Wathcher from './reactive/Watcher';



let obj = {
    a: {
        m: {
            n: 5
        }
    },
    b: 9,
    c: [2, 5, 9]
};
// defineReactive(obj, 'a');



// observe(obj);
// obj.b++;
// console.log(obj.b);
// obj.c.splice(0, 2, 10, 15);
// new Wathcher(obj, 'a.m.n', (val) => {
//     console.log(val);
// })
// obj.a.m.n = 99;
// console.log(obj);

*/





/* 
    指针思想
    let str = 'aaaaaabbbbbbbbbcccdddd',
    i = 0,
    j = 1,
    max = 0,
    char = '';
while (i <= str.length - 1) {
    if (str[i] !== str[j]) {
        if (j - i > max) {
            max = j - i;
            char = str[i];
        }
        i = j;
    }
    j++;
}
console.log(char, max); */

/* 

    递归 斐波那契数列

    // 1. 缓存对象
let cache = {};

function fib(n) {
    if (cache.hasOwnProperty(n)) {
        console.log('缓存');
        return cache[n]; 
    }
    let temp = n === 0 || n === 1 ? 1 : fib(n - 1) + fib(n - 2);
    cache[n] = temp;
    return temp;
}

for (let index = 0; index <= 9; index++) {
    console.log(fib(index));

}

let arr = [1, 5, [7, 9, 10],
    [
        [3, 2], 8
    ]
];

// 写法1
function convert(arr) {
    let res = [];
    arr.forEach(element => {
        if (typeof element === 'number') {
            res.push({
                value: element
            })
        } else if (Array.isArray(element)) {
            res.push({
                children: convert(element)
            })
        }
    });
    return res;
}

// 写法2 map映射
function converts(item) {
    if (typeof item === 'number') {
        return {
            value: item
        }
    } else if (Array.isArray(item)) {
        return {
            children: item.map(it => convert(it))
        }
    }
}

let o = convert(arr);
console.log(o);
    

*/


/* 

    栈
        智能重复
    let str = '2[1[a]2[2[b]3[c]]4[d]]'
// abbcccbbcccddddabbcccbbcccdddd


function stack(str) {
    let i = 0,
        numStack = [],
        strStack = [],
        rest = str;

    while (i < str.length - 1) {
        rest = str.substring(i);
        // 匹配剩余部分是否为 '数字[' 开头 是则把数字和空字符串各自入栈
        if (/^\d+\[/.test(rest)) {
            // 获取开头的数字
            let num = Number(rest.match(/^(\d+)\[/)[1]);
            numStack.push(num);
            strStack.push('');
            // 指针后移 移动数字位数的长度 + 1(1为[的长度)
            i += num.toString().length + 1;

        } else if (/^\w+\]/.test(rest)) {
            // 如果是字母 则把strStack的栈顶改为这个字母
            let word = rest.match(/^(\w+)\]/)[1];
            strStack[strStack.length - 1] = word;
            // 指针后移 word的长度
            i += word.length;

        } else if (rest[0] === ']') {
            // 遇到 ']'则把两栈出栈一位 并把字符栈出栈的拼接到前一位上
            let popNum = numStack.pop();
            let popWord = strStack.pop();
            strStack[strStack.length - 1] += popWord.repeat(popNum);
            i++;
        }
    }

    // while结束后 最后rest只剩结尾 ']' , 两个栈中各自还剩一个元素 都弹栈 并将字符串拼接相应的次数倍
    return strStack[0].repeat(numStack[0]);

}

let res = stack(str);
console.log(res);


*/