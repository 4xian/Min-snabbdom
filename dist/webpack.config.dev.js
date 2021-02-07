"use strict";

var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    // 虚拟打包路径,在server端生成而不是本地
    publicPath: 'xuni',
    // path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 8080,
    //  静态资源文件夹 
    contentBase: 'www'
  }
};