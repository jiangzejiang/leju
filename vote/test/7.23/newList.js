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
    // $.getJSON("http://zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&sur_id=2156&callback=?", function (data) {
    $.getJSON(allPersonPort, function (data) {
        console.log(data);
        var option = data.data.question[0].option;
        renderData(option);
        searchInput(option)
    });

    var myOption;

    function searchInput(option) {
        console.log(option);
        myOption = option;
        $('.search_input').on('input propertychange', search);
    }
    // 查找、拼接找到的候选人
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
                console.log(item);
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

    function doFunction(option) {
        var myOption = option.filter(function (item) {
            if (item.attrinfo != undefined && item.attrinfo.name_py) {
                return item;
            }
        })
        var report_list = myOption.sort(function (item1, item2) {
            if (item1.attrinfo.name_py > item2.attrinfo.name_py) {
                return 1;
            } else {
                return -1;
            }
        })
        console.log('这是')
        console.log(report_list)
        report_list.map(function (item) {
            // person_img
            var img = $('<img />').attr({
                src: item.attrinfo.personal_photo
            });
            var person_img = $('<div class="person_img"></div>').css({
                'background': 'url('+item.attrinfo.personal_photo+')',
                'background-size': 'contain'
            });

            // person_piao
            var zhichicount = $('<span></span>').html(item['count']['count'] + '票');
            var person_piao = $('<div class="person_piao"></div>').append(zhichicount, '<span><span>');

            var person_name = $('<p class="person_name"></p>').html(item.attrinfo.name);
            var person_desc = $('<p class="person_desc"></p>').html(item.attrinfo.sub_company + item.attrinfo.postion);
            // person_bottom
            var person_bottom = $('<div class="person_bottom"></div>').append(person_piao, person_name, person_desc);
            // person_toupiao_button
            var button_img = $('<img />').attr({
                src: 'http://src.leju.com/imp/imp/deal/95/f3/b/89aafad11ce6eda7c07c9e05668_p24_mk24.png'
            })
            var person_toupiao_button = $('<div class="person_toupiao_button"></div>').append(button_img);

            var person = $('<a class="person"></a>').attr({
                href: xiangqingUrl + "?" + item.oid
            }).append(person_img, person_bottom, person_toupiao_button);
            $('.allPerson').append(person);
            console.log('宽度' + img.width())
            console.log('高度' + img.height())

            $('.wrap').css({
                display: 'block'
            });
        })
    }

    function renderData(report_list) {
        // $.getJSON("http://api.survey.leju.com/index.php?c=interface&a=get_survey&sur_id=2156&type=result&callback=?", function (myCount) {
        $.getJSON(allCountPort, function (myCount) {

            console.log('获取总数')
            console.log(myCount);
            var newCountJosn = JSON.stringify(myCount);
            var countJson = localStorage.getItem('countJson');
            // 如果数据没有刷新过来
            if (countJson == newCountJosn) {
                var arr = [];
                // 把所有localStorage中的数据放在一个数组里
                for (var localStorageItem in localStorage) {
                    console.log(localStorageItem.substring(0, 7));
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
                arr.map(function (arrItem) {
                    // var index = 0;
                    for (var item in myCountData) {
                        // myCountData.map(function (item) {
                        if (arrItem.oid == item.toString()) {
                            var addCount = parseInt(arrItem.value);
                            var newMyCount = parseInt(myCountData[arrItem.oid].count) + addCount;
                            myCountData[arrItem.oid].count = newMyCount.toString();
                        }
                    }
                })

                var index = 0;
                report_list.map(function (item) {
                    index++;
                    for (var countItem in myCount.data) {
                        if (countItem.toString() === item.oid.toString()) {
                            item.count = myCount.data[item.oid];
                        }
                    }
                    if (index == report_list.length) {
                        console.log(report_list)
                        doFunction(report_list);
                    }
                })

            } else {
                //当发现获得了新的数据的时候，按正常显示
                // localStorage.clear();
                // 清除需要加上的次数
                for (var localStorageItem in localStorage) {
                    console.log(localStorageItem.substring(0, 7));
                    if (localStorageItem.substring(0, 7) == 'toupiao') {
                        localStorage.removeItem(localStorageItem);
                    }
                }

                localStorage.setItem('countJson', newCountJosn);
                var index = 0;
                report_list.map(function (item) {
                    index++;
                    for (var countItem in myCount.data) {
                        if (countItem.toString() === item.oid.toString()) {
                            item.count = myCount.data[item.oid];
                        }
                    }
                    if (index == report_list.length) {
                        console.log(report_list)
                        doFunction(report_list);
                    }
                })
            }
        })
    }
})