'use strict';
var fs = require('fs');

// 创建管道流
var rs = fs.createReadStream('./video.mp4');
// var index = 0
// rs.on('data', function (chunk) {
//     console.log('data');
//     index++;
//     console.log(chunk);
// });
// rs.on('end', function () {
//     console.log('end');
//     console.log('这是次数：' + index);
// })
// rs.on('error', function (err) {
//     console.log('error:' + err)
// })

// 删除模块
// fs.unlink('./sample.txt', (err) => {
//     if (err) throw err;
//     console.log('成功删除 sample.txt');
// });

// try {
//     fs.unlinkSync('./sample.txt');
//     console.log('successfully deleted ./sample.txt');
// } catch (err) {
//     console.log('抓到你了')
//     // handle the error
// }

// 管道流
var ws = fs.createWriteStream('./newVideo.mp4');
rs.pipe(ws)