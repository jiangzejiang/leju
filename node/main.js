'use strict';
var index = require('./index');
var name = '蒋怀祯';
// console.log(index);
// index.greet(name);


var fs = require('fs');
fs.readFile('./sample.txt', function (err, data) {
    console.log('文件读取')
    console.log(data)
    console.log(data.toString());
    var buffer = new Buffer(data);
    console.log(buffer)
})
fs.stat('./sample.txt', function (err, stat) {
    console.log('获取文件信息')
    console.log(stat)
    // console.log(stat.isFile())
})
var faData = 'are you ok'
fs.writeFile('./sample.txt', faData, function (err) {
    console.log('写入回调')
    if (err) {
        console.log('写入错误')
        console.log(err)
    }
})
