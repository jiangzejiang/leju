// rem
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '16px';
            } else {
                docEl.style.fontSize = 16 * (clientWidth / 640) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


$(function () {
    if (!localStorage.getItem('countJson')) {
        localStorage.setItem('countJson', '0');
    }
    // 获取人物所有数据
    $.getJSON(allPersonPort, function (data) {
        var option = data.data.question[0].option;
        renderData(option);
        searchInput(option)
    });

    var myOption;
    // 人物查找输入
    function searchInput(option) {
        myOption = option;
        $('.search_input').on('input propertychange', search);
    }
    // 将找到的候选人拼接进文档并显示出来
    function search() {
        var value = $('.search_input').val();
        var ul = $('.person_list ul');
        ul.html('');
        myOption.forEach(function (item) {
            var name = item.attrinfo.name;
            var isInclude = name.indexOf(value);
            if (value != '' && isInclude != -1) {
                $('.person_list').css({
                    display: 'block'
                });
                var a = $('<a></a>').attr({
                    href: xiangqingUrl + "?" + item.oid
                })
                a.html(name + '，' + item.attrinfo.sub_company);
                ul.append($('<li></li>').append(a))
            }
            if (value == '') {
                $('.person_list').css({
                    display: 'none'
                });
            }
        })
    }
    // 点击查找按钮
    $('.search_button').on('click', function () {
        if ($('.search_input').val() == '') {
            alert('请输入名字');
        } else {
            if ($('.person_list li').length < 1) {
                alert('没有找到你要找的人，请确认后再试');
            }
            search();
        }
    })
    // 拼接DOM文档
    function doFunction(option) {
        var a = 'bbuyuycccc';
        var b = 'bcc';
        console.log(a[0]);
        console.log(b[0])
        if(a > b) {
            console.log('这是a>b')
        }else {
            console.log('这是a<b')
        }
        if(a[0] > b[0]) {
            console.log('a > b')
        }else if(a[0] == b[0]) {
            console.log('a = b')
        }
        else {
            console.log('a < b')
        }

        console.log(option)
        var notName = [];
        var countSort = false;
        var report_list = option.filter(function (item) {
            var attrinfo =  item.attrinfo;
            if (attrinfo != undefined && attrinfo.name_py) {
                return item;
            }else{
                notName.push(item);
                // var name_py = attrinfo.name_py;
                // var name = attrinfo.name;
                // var personal_desc = attrinfo.personal_desc;
                // var personal_photo = attrinfo.personal_photo;
                // var postion = attrinfo.postion;
                // var sub_company = attrinfo.sub_company;
            }
        }).sort(function (item1, item2) {
            var item1Count = parseInt(item1.count.count) + parseInt(item1.count.base);
            var item2Count = parseInt(item2.count.count) + parseInt(item2.count.base);
            //以票数多少排序，如果票数相同就以拼音排序
            if(countSort) {
                if (item1Count < item2Count) {
                    return 1;
                } 
                else if(item1Count == item2Count && item1.attrinfo.name_py[0] > item2.attrinfo.name_py[0]) {
                    return 1;
                } 
                else {
                    return -1;
                }
            }
            // 以名字首字母排序，如果首字母相同就以票数多少排序
            else{
                if (item1.attrinfo.name_py[0] > item2.attrinfo.name_py[0]) {
                    return 1;
                } 
                else if(item1Count < item2Count && item1.attrinfo.name_py[0] == item2.attrinfo.name_py[0]) {
                    console.log(item1.attrinfo.name_py[0]);
                    console.log(item2.attrinfo.name_py[0])
                    return 1;
                } 
                else {
                    return -1;
                }
            }
           
        })
        console.log(notName);
        console.log(report_list)
        report_list.forEach(function (item, index) {
            // person_img,人物图片
            var person_img = $('<div class="person_img"></div>')
                .attr({ "data-url": item.attrinfo.personal_photo });
            if (index < 21) {
                person_img.css({
                    'background': 'url(' + item.attrinfo.personal_photo + ')',
                    'background-size': 'contain'
                })
            } else {
                person_img.css({
                    'background': 'url(' + report_list[0].attrinfo.personal_photo + ')',
                    'background-size': 'contain'
                })
            }

            // person_piao，人物票数
            var allCount = parseInt(item['count']['count']) + parseInt(item['count']['base']);

            var zhichicount = $('<span></span>').html(allCount + '票');
            var person_piao = $('<div class="person_piao"></div>').append(zhichicount, '<span><span>');
            // person_name，人物名字
            var person_name = $('<p class="person_name"></p>').html(item.attrinfo.name);
            // person_desc，人物描述
            var person_desc = $('<p class="person_desc"></p>').html(item.attrinfo.sub_company + item.attrinfo.postion);
            // person_bottom，下部
            var person_bottom = $('<div class="person_bottom"></div>').append(person_piao, person_name, person_desc);
            // person_toupiao_button，点击投票按钮
            var button_img = $('<img />').attr({
                src: 'http://src.leju.com/imp/imp/deal/95/f3/b/89aafad11ce6eda7c07c9e05668_p24_mk24.png'
            })
            var person_toupiao_button = $('<div class="person_toupiao_button"></div>').append(button_img);

            var person = $('<a class="person"></a>').attr({
                href: xiangqingUrl + "?" + item.oid
            }).append(person_img, person_bottom, person_toupiao_button);
            $('.allPerson').append(person);
        })
        $('.wrap').css({
            display: 'block'
        });
        var person_img = $('.person_img');
        for(var i = 21; i < person_img.length; i++) {
            $(person_img[i]).css({
                'background': 'url(' + $(person_img[i]).attr('data-url') + ')',
                'background-size': 'contain'
            })
        }
    }



    // 鼠标滚动
    // function scroll() {
    //     console.log('滚动')
    // }
    // $('document').on('scroll', scroll)

    // 获取到所有人物数据，处理数据
    function renderData(report_list) {
        // 获取总票数
        $.getJSON(allCountPort, function (myCount) {
            var newCountJosn = JSON.stringify(myCount);
            var countJson = localStorage.getItem('countJson');
            // 如果数据没有刷新过来
            if (countJson == newCountJosn) {
                var arr = [];
                // 把所有localStorage中的数据放在一个数组里
                for (var localStorageItem in localStorage) {
                    if (localStorageItem.substring(0, 7) == 'toupiao') {
                        var obj = {
                            oid: localStorageItem.substring(7),
                            value: localStorage.getItem(localStorageItem)
                        }
                        arr.push(obj);
                    }
                }
                // 循环localStorage里面自己加的次数
                var myCountData = myCount.data;
                arr.forEach(function (arrItem) {
                    for (var item in myCountData) {
                        if (arrItem.oid == item.toString()) {
                            var addCount = parseInt(arrItem.value);
                            var newMyCount = parseInt(myCountData[arrItem.oid].count) + addCount;
                            myCountData[arrItem.oid].count = newMyCount.toString();
                        }
                    }
                })

                var index = 0;
                report_list.forEach(function (item) {
                    index++;
                    for (var countItem in myCount.data) {
                        if (countItem.toString() === item.oid.toString()) {
                            item.count = myCount.data[item.oid];
                        }
                    }
                    if (index == report_list.length) {
                        doFunction(report_list);
                    }
                })

            } else {
                //当发现获得了新的数据的时候，按正常显示，清除需要加上的次数
                for (var localStorageItem in localStorage) {
                    if (localStorageItem.substring(0, 7) == 'toupiao') {
                        localStorage.removeItem(localStorageItem);
                    }
                }
                localStorage.setItem('countJson', newCountJosn);
                var index = 0;
                // 将总票数拼接进人物数据中
                report_list.forEach(function (item) {
                    index++;
                    for (var countItem in myCount.data) {
                        if (countItem.toString() === item.oid.toString()) {
                            item.count = myCount.data[item.oid];
                        }
                    }
                    if (index == report_list.length) {
                        doFunction(report_list);
                    }
                })
            }
        })
    }
})