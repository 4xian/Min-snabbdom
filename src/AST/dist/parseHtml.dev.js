"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseHtml;

var _parseAttr = _interopRequireDefault(require("./parseAttr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parseHtml(html) {
  var i = 0,
      rest = '',
      // 剩余字符串
  startReg = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/,
      // 开始标签匹配
  endReg = /^\<\/([a-z]+[1-6]?)\>/,
      // 结束标签匹配
  textReg = /^([^\<]+)\<\/[a-z]+[1-6]?\>/,
      // 文字匹配
  stack1 = [],
      // 存放开始标签
  stack2 = [{
    children: []
  }]; // 

  while (i < html.length - 1) {
    rest = html.substring(i); // 检测到开始标签

    if (startReg.test(rest)) {
      var startTag = rest.match(startReg)[1];
      var attrs = rest.match(startReg)[2]; // console.log('开始标签：', attrs);

      stack1.push(startTag);
      stack2.push({
        tag: startTag,
        children: [],
        attrs: (0, _parseAttr["default"])(attrs)
      });
      var attrsLength = attrs != null ? attrs.length : 0;
      i += startTag.length + 2 + attrsLength; //<> 长度占2位 + 属性的长度
    } else if (endReg.test(rest)) {
      // 检测到结束标签
      var endTag = rest.match(endReg)[1]; // console.log('结束标签：', endTag);

      var popTag = stack1.pop();

      if (endTag === popTag) {
        var popArr = stack2.pop(); // stack2若没有children属性则创建一个

        if (stack2.length > 0) {
          stack2[stack2.length - 1].children.push(popArr);
        }
      } else {
        throw new Error(stack1[stack1.length - 1] + '标签闭合状态有误！');
      }

      i += endTag.length + 3; // </> 占3位
      // console.log(JSON.stringify(stack2));
    } else if (textReg.test(rest)) {
      // 检测到文字
      var text = rest.match(textReg)[1];

      if (!/^\s+$/.test(text)) {
        // console.log('文字：', text);
        stack2[stack2.length - 1].children.push({
          text: text,
          type: 3
        });
      }

      i += text.length;
    } else {
      i++;
    }
  }

  return stack2[0].children[0];
}