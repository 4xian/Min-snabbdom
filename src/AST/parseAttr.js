export default function parseAttr(attrs) {
    if (attrs == undefined) return [];

    let isQuote = false,
        point = 0,
        result = [];

    for (let index = 0; index <= attrs.length; index++) {
        const char = attrs[index];
        if (char === '"') {
            // 遇见引号 说明属性开始
            isQuote = !isQuote;
        } else if (char === ' ' && !isQuote) {
            //  遇见空格 并且不在引号中 开始收集 引号内内容
            if (!/^\s*$/.test(attrs.substring(point, index)))
                result.push(attrs.substring(point, index).trim());
            point = index;
        }
    }
    result.push(attrs.substring(point).trim());
    result = result.map(item => {
        let temp = item.match(/^(.+)="(.+)"/);
        return {
            name: temp[1],
            value: temp[2]
        }
    })
    return result;
}