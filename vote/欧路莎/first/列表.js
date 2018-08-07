$(function () {
    if (!localStorage.getItem('countJson')) {
        localStorage.setItem('countJson', '0');
    }

    function doFunction(report_list) {
        report_list.map(function (item) {
            var img = $('<img />').attr({
                src: item.attrinfo.personal_photo
            });
            var tiaoZhuan = $('<a></a>').attr({
                href: "http://sh.jiaju.sina.com.cn/6427339243571718353/2018/0724/6427346277356604149.html?" + item.oid
            }).html(img);
            var report_portrait = $('<div class="report_portrait"></div>').html(tiaoZhuan)

            // report_right
            var name = $('<p></p>').html(item.attrinfo.name);
            var company = $('<p></p>').html(item.attrinfo.sub_company);
            var report_msg = $('<div class="report_msg"></div>').append(name, company)

            //report_poll
            console.log(item)
            var zhichicount = $('<span></span>').html(item['count']['count'])
            var report_poll = $('<div class="report_poll"></div>').attr({
                my_oid: item.oid
            }).append(zhichicount);

            // report_support
            var supportClick = $('<a></a>').attr({
                href: 'http://sh.jiaju.sina.com.cn/6427339243571718353/2018/0724/6427346277356604149.html?' + item.oid
            });

            var report_support = $('<div class="report_support"></div>').html(supportClick);

            var report_right = $('<div class="report_right"></div>').append(report_msg, report_poll, report_support)
            var li = $('<li></li>').append(report_portrait).append(report_right);
            // report_list_dom.append(li)
            $('.report_list').append(li);
            $('.wrap').css({display: "block"});
        })
    }

    function renderData(report_list) {
        $.getJSON("http://api.survey.leju.com/index.php?c=interface&a=get_survey&sur_id=2156&type=result&callback=?", function (myCount) {
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
                    var index = 0;
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
                localStorage.clear();
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

    $.getJSON("http://zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&sur_id=2156&callback=?", function (data) {
        console.log(data);
        renderData(data.data.question[0].option);
    });

})