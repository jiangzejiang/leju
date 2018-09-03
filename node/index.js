'use strict';

var name = '蒋泽';
function greet(name) {
    console.log(name + '，你好！')
}
// module.exports = greet;
// console.log('这是index文件的文件夹路径：'+__dirname);
// console.log('这是当前模块文件所在的文件夹路径+文件名:'+__filename );

exports.greet = greet;
// var mine = require('../node/index');
// console.log(mine);