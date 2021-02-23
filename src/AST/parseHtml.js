import parseAttr from "./parseAttr";

export default function parseHtml(html) {
    let i = 0,
        rest = '', // 剩余字符串
        startReg = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/, // 开始标签匹配
        endReg = /^\<\/([a-z]+[1-6]?)\>/, // 结束标签匹配
        textReg = /^([^\<]+)\<\/[a-z]+[1-6]?\>/, // 文字匹配
        stack1 = [], // 存放开始标签
        stack2 = [{
            children: []
        }]; // 


    while (i < html.length - 1) {
        rest = html.substring(i);
        // 检测到开始标签
        if (startReg.test(rest)) {
            let startTag = rest.match(startReg)[1];
            let attrs = rest.match(startReg)[2];
            // console.log('开始标签：', attrs);

            stack1.push(startTag);
            stack2.push({
                tag: startTag,
                children: [],
                attrs: parseAttr(attrs)
            });
            const attrsLength = attrs != null ? attrs.length : 0;
            i += startTag.length + 2 + attrsLength; //<> 长度占2位 + 属性的长度

        } else if (endReg.test(rest)) {
            // 检测到结束标签
            let endTag = rest.match(endReg)[1];
            // console.log('结束标签：', endTag);
            let popTag = stack1.pop();
            if (endTag === popTag) {
                let popArr = stack2.pop();
                // stack2若没有children属性则创建一个
                if (stack2.length > 0) {
                    stack2[stack2.length - 1].children.push(popArr);
                }

            } else {
                throw new Error(stack1[stack1.length - 1] + '标签闭合状态有误！')
            }
            i += endTag.length + 3 // </> 占3位
            // console.log(JSON.stringify(stack2));

        } else if (textReg.test(rest)) {
            // 检测到文字
            let text = rest.match(textReg)[1];
            if (!/^\s+$/.test(text)) {
                // console.log('文字：', text);
                stack2[stack2.length - 1].children.push({
                    text: text,
                    type: 3
                })
            }

            i += text.length;
        } else {
            i++;
        }
    }

    return stack2[0].children[0];


}