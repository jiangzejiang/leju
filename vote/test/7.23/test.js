$(function () {
    var test = window.location.href;
    var oid = (function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串   
        var theRequest;
        if (url.indexOf("?") != -1) {
            theRequest = url.slice(url.indexOf("?") + 1);
        }
        // var myRequest = theRequest.replace('=', '');
        var myRequest = parseInt(theRequest);
        var Request = myRequest.toString();
        return myRequest;
    })();

    function formatSeconds(value) {
        var secondTime = parseInt(value); // 秒
        var minuteTime = 0; // 分
        var hourTime = 0; // 小时
        var dayTime = 0; // 天

        if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = Math.floor(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = Math.floor(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if (minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = Math.floor(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = Math.floor(minuteTime % 60);
                if (hourTime >= 24) {
                    dayTime = Math.floor(hourTime / 24);
                    hourTime = hourTime - dayTime * 24;
                }
            }
        }

        var result = "" + secondTime + "秒";

        if (minuteTime > 0) {
            result = "" + minuteTime + "分" + result;
        }
        if (hourTime > 0) {
            result = "" + hourTime + "小时" + result;
        }
        if (dayTime > 0) {
            result = '' + dayTime + '天' + result;
        }
        if (secondTime == 60) {
            result = '1分钟'
        }
        if (minuteTime == 60) {
            result = "1小时"
        }
        if (hourTime == 24) {
            result = '1天'
        }
        if (dayTime > 0 && hourTime == 0 && minuteTime == 0 && secondTime == 0) {
            result = '1天'
        }
        if (secondTime < 0) {
            result = "请勿频繁投票";
        }
        return result;
    }

    function renderData(report_list, myAllData) {
        console.log(myAllData);
        console.log(report_list)
        for (var i = 0; i < report_list.length; i++) {
            if (report_list[i].oid == oid) {
                console.log(report_list[i])
                var data = report_list[i];
                // left
                var img = $('<img />').attr({
                    src: data.attrinfo.personal_photo
                }).css({
                    width: '6.6875rem',
                    height: '6.6875rem'
                });
                var wt_huangk = $('<div class="wt_huangk"></div>')
                var left = $('<div class="left"></div>').append(img, wt_huangk);

                // right
                var right = $('<div class="right"><span class="details_man"></span><div class="shelter"></div></div>')
                // right_name
                var right_name = $('<div class="right_name"></div>').append($('<h2></h2>').html(data.attrinfo.name)).append($('<p></p>').html(data.attrinfo.name_py));

                //right_company
                var right_company = $('<div class="right_company"></div>').append($('<p></p>').html('公司：' + data.attrinfo.sub_company)).append($('<p></p>').html('职位：' + data.attrinfo.postion));

                //right_details
                var right_details = $('<div class="right_details"></div>').html($('<p></p>').html(data.attrinfo.personal_desc));

                // click_button
                var left_button = $('<div class="left_button"></div>').append($('<a></a>').attr({
                    href: 'javascript:void(0)'
                }));
                var right_button = $('<div class="right_button"></div>').append($('<a></a>').attr({

                    href: liebiaoUrl + '?' + Math.random()
                }));
                right.append(right_name, right_company, right_details);
                var click_button = $('<div class="click_button"></div>').append(left_button, right_button);
                $('.details').append(left, right, click_button);
                $('.wrap').css({
                    display: 'block'
                })

                left_button.click(function () {
                    $.getJSON(votePort + data.qid + "=" + data.oid + "&callback=?", function (data) {
                        if (data.msg) {
                            //把每个投票成功的人的oid当作key,在这一分钟缓存内自己模拟数据加减
                            if (data.msg == '投票成功') {
                                var myStorageKey = 'toupiao' + oid;
                                var addCount = localStorage.getItem(myStorageKey) || '0';
                                var newAddCount = parseInt(addCount) + 1;
                                var count = newAddCount.toString();
                                localStorage.setItem(myStorageKey, count);
                                var succeedTime = new Date();
                                localStorage.setItem('succeedTime' + oid, (succeedTime.getTime()).toString());
                                alert(data.msg)
                            } else {
                                var clickTime = new Date();
                                var milliseconds = clickTime.getTime();
                                var pastTiem = parseInt(myAllData.data.refresh_frequency - parseInt(milliseconds - localStorage.getItem('succeedTime' + oid)) / 1000);
                                if (pastTiem < 0) {
                                    alert('请勿频繁投票');
                                } else {
                                    alert('请勿频繁投票，请' + formatSeconds(pastTiem) + '后再试');
                                }
                            }
                        }
                    });
                })

                return;
            }
        }
    }
    // $.getJSON("http://zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&sur_id=2156&callback=?", function (data) {
    $.getJSON(allPersonPort , function (data) {
        
        renderData(data.data.question[0].option, data);
    });

})